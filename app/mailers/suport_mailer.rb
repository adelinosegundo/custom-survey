class SuportMailer < ApplicationMailer
  include ApplicationHelper

  def deliver_survey_mail_message reply
  	@recipient = reply.recipient
  	recipient_data = reply.mail_message.survey
  		.users_data["users"].select {|data| data["email"] == reply.recipient.email }[0]
    @content = translate_tags recipient_data, reply.mail_message.content.dup
    reply.update(sended: true)
    mail(:to => reply.recipient.email, :subject => reply.mail_message.subject)
  end
end
