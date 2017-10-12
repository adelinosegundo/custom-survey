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
# Foreign Keys
#
#  fk_rails_637b66a76c  (multiple_choice_question_id => multiple_choice_questions.id)
#

class Alternative < ActiveRecord::Base
  belongs_to :multiple_choice_question
end
