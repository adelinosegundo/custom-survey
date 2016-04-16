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

  has_many :replies
end
