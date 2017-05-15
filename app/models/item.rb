# == Schema Information
#
# Table name: items
#
#  id           :integer          not null, primary key
#  sequence     :integer
#  survey_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  actable_id   :integer
#  actable_type :string
#

class Item < ActiveRecord::Base
  actable dependent: :destroy
  include Conditionable
  
  belongs_to :page

  accepts_nested_attributes_for :actable, allow_destroy: true

  default_scope { order(:sequence) }

  validates :sequence, uniqueness: { scope: :page_id }

  def actable_attributes=(actable_attributes)
    self.actable ||= actable_type.constantize.new
    actable.assign_attributes(actable_attributes)
  end

  def get_survey_template_name
    "#{actable_type.underscore}"
  end
end