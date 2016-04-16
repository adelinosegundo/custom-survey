# == Schema Information
#
# Table name: multiple_choice_questions
#
#  id              :integer          not null, primary key
#  accepts_mutiple :boolean
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class MultipleChoiceQuestion < ActiveRecord::Base
  acts_as :question
end
