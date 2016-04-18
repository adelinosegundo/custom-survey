# == Schema Information
#
# Table name: mail_messages
#
#  id         :integer          not null, primary key
#  subject    :string
#  content    :text
#  survey_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MailMessage < ActiveRecord::Base
  belongs_to :survey

  has_many :replies, dependent: :destroy
  has_many :github_users, through: :replies

  def generate_new_links
    GithubUser.all.each do |github_user|
      reply = Reply.find_or_create_by mail_message: self, github_user: github_user
    end
    true
  end
end
