class SuportMailer < ApplicationMailer
  include ApplicationHelper

  def deliver_survey_mail_message recipient
    @recipient = recipient
    survey = recipient.survey

    mail_message = survey.mail_message
    recipient_data = survey.users_data[recipient.email]
    reply_link = build_reply_link_for_recipient recipient
    recipient_data["reply_link"] = reply_link
    @content = translate_tags(recipient_data, mail_message.content.dup)

    subject = translate_tags recipient_data, mail_message.subject.dup

    recipient.update(sended: true)
    mail(:to => recipient.email, :subject => subject, delivery_method: :smtp)
  end
end
