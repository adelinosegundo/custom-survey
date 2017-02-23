class SuportMailer < ApplicationMailer
  include ApplicationHelper

  def deliver_survey_mail_message reply
    mail_message = reply.mail_message
    survey = mail_message.survey
    @recipient = reply.recipient
    recipient_data = survey.users_data[reply.recipient.email]
    @content = translate_tags( recipient_data, mail_message.content.dup )

    reply_link = new_reply_survey_url(reply.link_hash)
    @content = @content.sub(/reply_link/, reply_link)

    subject = translate_tags recipient_data, reply.mail_message.subject
    reply.update(sended: true)
    mail(:to => reply.recipient.email, :subject => reply.mail_message.subject)
  end
end
