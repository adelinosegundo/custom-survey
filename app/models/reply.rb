# == Schema Information
#
# Table name: replies
#
#  id              :integer          not null, primary key
#  link_hash       :string
#  answers         :json
#  mail_message_id :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  recipient_id    :integer
#  sended          :boolean          default(FALSE)
#

class Reply < ActiveRecord::Base
  belongs_to :mail_message
  belongs_to :recipient

  has_many :answers, dependent: :destroy
  has_one :survey, through: :mail_message

  accepts_nested_attributes_for :answers, allow_destroy: true

  scope :answered, -> { joins(:answers).where.not(answers: {id: nil}) }
  scope :delivered, -> { where(sended: true) }
  scope :undelivered, -> { where(sended: false) }
end
