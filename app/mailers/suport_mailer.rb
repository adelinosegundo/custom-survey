class SuportMailer < ApplicationMailer
  def deliver_survey_mail_message mail_message
    @content = mail_message.content
    Reply.includes(:github_user).where(mail_message: mail_message).each do |reply|
      @reply_id = reply.id
      puts reply.github_user.email
      mail(:to => reply.github_user.email, :subject => mail_message.subject)
    end
  end
end
