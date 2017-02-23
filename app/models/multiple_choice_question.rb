# == Schema Information
#
# Table name: multiple_choice_questions
#
#  id               :integer          not null, primary key
#  number           :integer
#  title            :string
#  description      :text
#  is_required      :boolean
#  accepts_multiple :boolean
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class MultipleChoiceQuestion < ActiveRecord::Base
  acts_as :item

  has_many :alternatives, dependent: :destroy

  accepts_nested_attributes_for :alternatives, allow_destroy: true
end
