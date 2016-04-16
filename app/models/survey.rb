class Survey < ActiveRecord::Base
  has_many :items
  has_many :mail_messages
  has_many :replies, through: :mail_messages
  has_many :github_users, through: :mail_messages
end
