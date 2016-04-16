# == Schema Information
#
# Table name: items
#
#  id           :integer          not null, primary key
#  order        :integer
#  survey_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  actable_id   :integer
#  actable_type :string
#

class Item < ActiveRecord::Base
  actable
  
  belongs_to :survey

  def get_form_template_name
    "item"
  end
end
