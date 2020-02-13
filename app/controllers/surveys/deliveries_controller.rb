class Surveys::DeliveriesController < ApplicationController
  before_action :set_survey
  before_action :set_mail_message, only: [:index, :update, :deliver, :perform]

  def index
    authorize_namespace @survey
  end

  def update
    authorize_namespace @survey

    if @mail_message.update(mail_message_params)
      redirect_to survey_deliveries_path(@survey), notice: 'Mail message was successfully updated.'
    else
      render :edit
    end
  end

  def perform
    authorize_namespace @survey

    recipients = @mail_message.recipients.undelivered
    recipients = recipients.where(id: params[:recipient_id]) if params[:recipient_id]
    recipients.each_slice(ENV['DELIVER_BATCH_SIZE'].to_i).with_index do |_recipients, index|
      @mail_message.delay_for((index+1).hour, retry: false).deliver(_recipients.map(&:id))
    end
    redirect_to survey_deliveries_path(@survey), notice: 'Successfully started delivering'
  end

  private

    def set_survey
      @survey = Survey.find(params[:id])
    end

    def set_mail_message
      @mail_message = @survey.mail_message
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mail_message_params
      params.require(:mail_message).permit(:subject, :content, :survey_id)
    end
end
