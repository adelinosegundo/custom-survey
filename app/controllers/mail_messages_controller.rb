class MailMessagesController < ApplicationController
  before_action :set_mail_message, only: [:show, :edit, :update, :destroy, :deliver, :answers_as]


  # GET /mail_messages
  def index
    @mail_messages = MailMessage.eager_load(:survey).all
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
    @mail_message = MailMessage.new
  end

  # GET /mail_messages/1/edit
  def edit
  end

  # POST /mail_messages
  def create
    @mail_message = MailMessage.new(mail_message_params)
    if @mail_message.save
      redirect_to mail_messages_url, notice: 'Mail message was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /mail_messages/1
  def update
    if @mail_message.update(mail_message_params)
      redirect_to mail_messages_url, notice: 'Mail message was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /mail_messages/1
  def destroy
    @mail_message.destroy
    redirect_to mail_messages_url, notice: 'Mail message was successfully destroyed.'
  end

  # POST /mail_messages/:id/deliver
  def deliver
    # @mail_message.generate_new_links
    # SuportMailer.deliver_survey_mail_message(@mail_message).deliver_now
    redirect_to mail_messages_path(@survey)
  end

  # GET /mail_messages/:id/answers_as
  def answers_as
    puts @survey
    @answers = @mail_message.replies.map(&:answers)
    puts @answers
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mail_message
      @mail_message = MailMessage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mail_message_params
      params.require(:mail_message).permit(:subject, :content, :survey_id)
    end
end
