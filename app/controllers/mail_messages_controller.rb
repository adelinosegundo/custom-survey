class MailMessagesController < ApplicationController
  before_action :set_survey
  before_action :set_mail_message, only: [:show, :edit, :update, :destroy, :deliver, :answers_as]


  # GET /surveys/:survey_id/mail_messages
  def index
    @mail_messages = @survey.mail_messages
  end

  # GET /surveys/:survey_id/mail_messages/1
  def show
  end

  # GET /surveys/:survey_id/mail_messages/new
  def new
    @mail_message = @survey.mail_messages.build
  end

  # GET /surveys/:survey_id/mail_messages/1/edit
  def edit
  end

  # POST /surveys/:survey_id/mail_messages
  def create
    @mail_message = @survey.mail_messages.build(mail_message_params)
    if @mail_message.save
      redirect_to mail_messages_url, notice: 'Mail message was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /surveys/:survey_id/mail_messages/1
  def update
    if @mail_message.update(mail_message_params)
      redirect_to mail_messages_url, notice: 'Mail message was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /surveys/:survey_id/mail_messages/1
  def destroy
    @mail_message.destroy
    redirect_to mail_messages_url, notice: 'Mail message was successfully destroyed.'
  end

  # POST /surveys/:survey_id/mail_messages/:id/deliver
  def deliver
    Reply.destroy_all
    puts @mail_message.to_json
    @survey.generate_new_links @mail_message
    SuportMailer.deliver_survey_mail_message(@mail_message).deliver_now
    redirect_to survey_mail_messages_path(@survey)
  end

  # GET /surveys/:survey_id/mail_messages/:id/answers_as
  def answers_as
    puts @survey
    @answers = @mail_message.replies.map(&:answers)
    puts @answers
  end

  private
    def set_survey
      @survey = Survey.find(params[:survey_id])
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_mail_message
      @mail_message = @survey.mail_messages.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mail_message_params
      params.require(:mail_message).permit(:subject, :content, :survey_id)
    end
end
