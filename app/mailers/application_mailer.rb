class ApplicationMailer < ActionMailer::Base
  default from: ENV['MAILGUN_USER_NAME']
  layout 'mailer'
end
