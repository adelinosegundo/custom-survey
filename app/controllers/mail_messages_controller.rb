class MailMessagesController < ApplicationController
  before_action :set_survey
  before_action :set_mail_message, only: [:show, :edit, :update, :destroy, :deliver, :answers_as]


  # GET /mail_messages
  def index
    @mail_messages = @survey.mail_messages
  end

  # GET /mail_messages/1/recipients
  def recipients
    respond_to do |format|
      format.json { render json: MailMessageRecipientsDatatable.new(view_context , {mail_message_id: params[:id]}) }
    end
  end

  # GET /mail_messages/1
  def show
  end

  # GET /mail_messages/new
  def new
    @mail_message = @survey.mail_messages.build
  end

  # GET /mail_messages/1/edit
  def edit
  end

  # POST /mail_messages
  def create
    @mail_message = @survey.mail_messages.build(mail_message_params)
    if @mail_message.save
      redirect_to survey_mail_messages_url(@survey), notice: 'Mail message was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /mail_messages/1
  def update
    if @mail_message.update(mail_message_params)
      redirect_to survey_mail_messages_url(@survey), notice: 'Mail message was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /mail_messages/1
  def destroy
    @mail_message.destroy
    redirect_to survey_mail_messages_url(@survey), notice: 'Mail message was successfully destroyed.'
  end

  # POST /mail_messages/:id/deliver
  def deliver
    @mail_message.delay.deliver params[:reply_id] || nil
    redirect_to survey_mail_message_path(@survey, @mail_message), notice: 'Successfully started delivering'
  end

  # GET /mail_messages/:id/answers_as
  def answers_as
    puts @survey
    @answers = @mail_message.replies.map(&:answers)
    puts @answers
  end

  private

    def set_survey
      @survey = Survey.find(params[:survey_id])
    end

    def set_mail_message
      @mail_message = @survey.mail_messages.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mail_message_params
      params.require(:mail_message).permit(:subject, :content, :survey_id)
    end
end
