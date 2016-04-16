# == Schema Information
#
# Table name: alternatives
#
#  id                          :integer          not null, primary key
#  value                       :string
#  multiple_choice_question_id :integer
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#

class Alternative < ActiveRecord::Base
  belongs_to :multiple_choice_question
end
