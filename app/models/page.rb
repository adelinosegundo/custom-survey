# == Schema Information
#
# Table name: pages
#
#  id         :integer          not null, primary key
#  survey_id  :integer
#  sequence   :integer
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_pages_on_survey_id  (survey_id)
#
# Foreign Keys
#
#  fk_rails_ce8a6229df  (survey_id => surveys.id)
#

class Page < ActiveRecord::Base
  # include Conditionable

  belongs_to :survey

  has_many :items, -> { order(:sequence) }, dependent: :destroy
  accepts_nested_attributes_for :items, allow_destroy: true
end
