class MailMessagesController < ApplicationController
  before_action :set_form
  before_action :set_mail_message, only: [:show, :edit, :update, :destroy, :deliver, :answers_as]


  # GET /forms/:form_id/mail_messages
  def index
    @mail_messages = @form.mail_messages
  end

  # GET /forms/:form_id/mail_messages/1
  def show
  end

  # GET /forms/:form_id/mail_messages/new
  def new
    @mail_message = @form.mail_messages.build
  end

  # GET /forms/:form_id/mail_messages/1/edit
  def edit
  end

  # POST /forms/:form_id/mail_messages
  def create
    @mail_message = @form.mail_messages.build(mail_message_params)
    if @mail_message.save
      redirect_to mail_messages_url, notice: 'Mail message was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /forms/:form_id/mail_messages/1
  def update
    if @mail_message.update(mail_message_params)
      redirect_to mail_messages_url, notice: 'Mail message was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /forms/:form_id/mail_messages/1
  def destroy
    @mail_message.destroy
    redirect_to mail_messages_url, notice: 'Mail message was successfully destroyed.'
  end

  # POST /forms/:form_id/mail_messages/:id/deliver
  def deliver
    Reply.destroy_all
    puts @mail_message.to_json
    @form.generate_new_links @mail_message
    SuportMailer.deliver_form_mail_message(@mail_message).deliver_now
    redirect_to form_mail_messages_path(@form)
  end

  # GET /forms/:form_id/mail_messages/:id/answers_as
  def answers_as
    puts @form
    @answers = @mail_message.replies.map(&:answers)
    puts @answers
  end

  private
    def set_form
      @form = Form.find(params[:form_id])
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_mail_message
      @mail_message = @form.mail_messages.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mail_message_params
      params.require(:mail_message).permit(:subject, :content, :form_id)
    end
end
