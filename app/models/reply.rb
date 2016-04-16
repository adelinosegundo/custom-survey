class Reply < ActiveRecord::Base
  belongs_to :mail_message
  belongs_to :github_user
end
