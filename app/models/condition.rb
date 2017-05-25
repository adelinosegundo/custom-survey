class Condition < ActiveRecord::Base
  belongs_to :conditionable, polymorphic: true
  validates :reference_type, :reference, :comparator, :value, presence: true

  COMPARATORS = ['>', '>=', '<', '<=', '=', '!=']
  REFERENCE_TYPES = ['question', 'tag']

  validates :comparator, inclusion: { in: COMPARATORS }
  validates :reference_type, inclusion: { in: REFERENCE_TYPES }

  def compare reply
    case reference_type
    when "question"
      item_id = MultipleChoiceQuestion.find_by(
          number: reference.to_i, 
          id: reply.survey.items.where(actable_type: "MultipleChoiceQuestion").pluck(:actable_id)
        ).acting_as.id
      answer = reply.answers.find_by(item_id: item_id, reply_id: reply.id)
      unless answer
        return false
      end
      reply_value = answer.value
    when "tag"
      mail_message = reply.mail_message
      survey = mail_message.survey
      recipient = reply.recipient
      recipient_data = survey.users_data[reply.recipient.email]
      reply_value = recipient_data[reference]
    end
    case comparator
    when '>' then
      if reply_value > value
        result = true
      else
        result = false
      end
    when '>=' then
      if reply_value >= value
        result = true
      else
        result = false
      end
    when '<' then
      if reply_value < value
        result = true
      else
        result = false
      end
    when '<=' then
      if reply_value <= value
        result = true
      else
        result = false
      end
    when '=' then
      if reply_value == value
        result = true
      else
        result = false
      end
    when '!=' then
      if reply_value != value
        result = true
      else
        result = false
      end
    else
      result = false
    end

    unless result
      if conditionable_type == "Page"
        reply.answers.where(item_id: conditionable.items).destroy_all
      end
    end

    return result
  end
end
