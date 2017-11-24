# == Schema Information
#
# Table name: recipients
#
#  id         :integer          not null, primary key
#  email      :string
#  subscribed :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  sended     :boolean          default(FALSE)
#  link_hash  :string
#  survey_id  :integer
#
# Foreign Keys
#
#  fk_rails_75010e303a  (survey_id => surveys.id)
#

class Recipient < ActiveRecord::Base
  belongs_to :survey
  has_many :answers, dependent: :destroy

  validates :email, uniqueness: { scope: :survey_id }
  validates :link_hash, uniqueness: true

  scope :active, -> { where(subscribed: true) }
  scope :inactive, -> { where(subscribed: false) }

  scope :answered, -> { joins(:answers).where.not(answers: {id: nil}).distinct }
  scope :delivered, -> { where(sended: true) }
  scope :undelivered, -> { where(sended: false) }

  accepts_nested_attributes_for :answers

  def self.filter_inactive emails
    emails - Recipient.inactive.pluck(:email)
  end
end
