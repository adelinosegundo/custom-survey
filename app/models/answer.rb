class Answer < ActiveRecord::Base
  belongs_to :reply
  belongs_to :item

  before_save :value_array

  def value_array
    self.value = self.value.gsub("[", "").gsub("]", "").gsub("\"", "") if self.item.actable_type == "MultipleChoiceQuestion" && self.item.specific.accepts_multiple && self.value
  end
end
