# == Schema Information
#
# Table name: replies
#
#  id              :integer          not null, primary key
#  link_hash       :string
#  answers         :json
#  mail_message_id :integer
#  github_user_id  :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Reply < ActiveRecord::Base
  belongs_to :mail_message
  belongs_to :recipient

  has_one :survey, through: :mail_message
end
