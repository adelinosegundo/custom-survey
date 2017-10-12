# == Schema Information
#
# Table name: items
#
#  id           :integer          not null, primary key
#  sequence     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  actable_id   :integer
#  actable_type :string
#  page_id      :integer
#
# Indexes
#
#  index_items_on_page_id  (page_id)
#
# Foreign Keys
#
#  fk_rails_91bce3eb3e  (page_id => pages.id)
#

class Item < ActiveRecord::Base
  actable dependent: :destroy
  # include Conditionable

  QUESTIONS_TYPE = %w[MultipleChoiceQuestion Question].freeze

  belongs_to :page

  has_many :answers, dependent: :destroy

  accepts_nested_attributes_for :actable, allow_destroy: true

  default_scope { order(:sequence) }

  scope :questions, -> { where(actable_type: QUESTIONS_TYPE) }

  def actable_attributes=(actable_attributes = {})
    self.actable ||= actable_type.constantize.new
    actable.assign_attributes(actable_attributes)
  end

  def get_survey_template_name
    "#{actable_type.underscore}"
  end
end
