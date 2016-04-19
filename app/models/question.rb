# == Schema Information
#
# Table name: questions
#
#  id          :integer          not null, primary key
#  number      :integer
#  title       :string
#  description :text
#  is_required :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Question < ActiveRecord::Base
  acts_as :item

  def get_survey_template_name
    "question"
  end
end
