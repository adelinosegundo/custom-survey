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
  has_many :items
  has_many :mail_messages
  has_many :replies, through: :mail_messages
  has_many :github_users, through: :replies

  validates :name, :title, presence: true
end
