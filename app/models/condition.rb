# == Schema Information
#
# Table name: conditions
#
#  id                 :integer          not null, primary key
#  reference_type     :string
#  reference          :string
#  comparator         :string
#  value              :string
#  conditionable_id   :integer
#  conditionable_type :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Condition < ActiveRecord::Base
  belongs_to :conditionable, polymorphic: true
  validates :reference_type, :reference, :comparator, :value, presence: true

  COMPARATORS = ['>', '>=', '<', '<=', '=', '!=']
  REFERENCE_TYPES = ['question', 'tag']

  validates :comparator, inclusion: { in: COMPARATORS }
  validates :reference_type, inclusion: { in: REFERENCE_TYPES }

  def compare recipient
    case reference_type
    when "question"
      item_id = MultipleChoiceQuestion.find_by(
          number: reference.to_i,
          id: recipient.survey.items.where(actable_type: "MultipleChoiceQuestion").pluck(:actable_id)
        ).acting_as.id
      answer = recipient.answers.find_by(item_id: item_id, recipient_id: recipient.id)
      unless answer
        return false
      end
      recipient_value = answer.value
    when "tag"
      mail_message = recipient.mail_message
      survey = mail_message.survey
      recipient = recipient.recipient
      recipient_data = survey.users_data[recipient.recipient.email]
      recipient_value = recipient_data[reference]
    end
    case comparator
    when '>' then
      if recipient_value > value
        result = true
      else
        result = false
      end
    when '>=' then
      if recipient_value >= value
        result = true
      else
        result = false
      end
    when '<' then
      if recipient_value < value
        result = true
      else
        result = false
      end
    when '<=' then
      if recipient_value <= value
        result = true
      else
        result = false
      end
    when '=' then
      if recipient_value == value
        result = true
      else
        result = false
      end
    when '!=' then
      if recipient_value != value
        result = true
      else
        result = false
      end
    else
      result = false
    end

    unless result
      if conditionable_type == "Page"
        recipient.answers.where(item_id: conditionable.items).destroy_all
      end
    end

    return result
  end
end
