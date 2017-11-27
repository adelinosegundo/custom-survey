# == Schema Information
#
# Table name: answers
#
#  id           :integer          not null, primary key
#  value        :string
#  item_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  recipient_id :integer
#
# Indexes
#
#  index_answers_on_item_id  (item_id)
#
# Foreign Keys
#
#  fk_rails_685535a3b6  (item_id => items.id)
#

class Answer < ActiveRecord::Base
  belongs_to :recipient
  belongs_to :item

  before_save :value_array

  scope :from_recipient, -> (recipient_id) {where(recipient_id: recipient_id)}

  def value_array
    self.value = self.value.gsub("[", "").gsub("]", "").gsub("\"", "") if self.item.actable_type == "MultipleChoiceQuestion" && self.item.specific.accepts_multiple && self.value
  end
end
