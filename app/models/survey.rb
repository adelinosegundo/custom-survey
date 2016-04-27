# == Schema Information
#
# Table name: surveys
#
#  id         :integer          not null, primary key
#  name       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Survey < ActiveRecord::Base
  has_many :mail_messages
  has_many :replies, through: :mail_messages
  has_many :recipients, through: :replies

  has_many :items, dependent: :destroy
  accepts_nested_attributes_for :items, allow_destroy: true

  validates :name, :title, presence: true
end
