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
  has_many :github_users, through: :replies  
  
  has_many :items, dependent: :destroy

  has_many :messages, through: :items, source: :actable, source_type: "Message"
  has_many :page_breaks, through: :items, source: :actable, source_type: "PageBreak"
  has_many :questions, through: :items, source: :actable, source_type: "Question"
  has_many :multiple_choice_questions, through: :items, source: :actable, source_type: "MultipleChoiceQuestion"

  validates :name, :title, presence: true

  accepts_nested_attributes_for :items, allow_destroy: true
  accepts_nested_attributes_for :messages, allow_destroy: true
  accepts_nested_attributes_for :page_breaks, allow_destroy: true
  accepts_nested_attributes_for :questions, allow_destroy: true
  accepts_nested_attributes_for :multiple_choice_questions, allow_destroy: true
end
