Rails.application.config.action_mailer.smtp_settings = {
  :authentication => :plain,
  :address => "smtp.gmail.com",
  :port => 587,
  :domain => ENV['MAIL_DOMAIN'],
  :user_name => ENV['MAIL_USERNAME'],
  :password => ENV["MAIL_PASSWORD"]
}

