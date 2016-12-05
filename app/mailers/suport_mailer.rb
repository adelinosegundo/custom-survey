class SuportMailer < ApplicationMailer
  include ApplicationHelper

  def deliver_survey_mail_message reply
  	@recipient = reply.recipient
  	recipient_data = reply.mail_message.survey.users_data[reply.recipient.email]
    @content = translate_tags(
    	recipient_data, 
    	reply.mail_message.content.dup, 
    	"http://104.236.97.231/surveys/#{reply.mail_message.survey.id}/new_reply/#{reply.link_hash}"
	)
    reply.update(sended: true)
    mail(:to => reply.recipient.email, :subject => reply.mail_message.subject)
  end
end
