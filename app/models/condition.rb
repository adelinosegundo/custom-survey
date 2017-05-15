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
      reply_value = reply.answers.find_by(item_id: item_id, reply_id: reply.id).value
    when "tag"
      mail_message = reply.mail_message
      survey = mail_message.survey
      recipient = reply.recipient
      recipient_data = survey.users_data[reply.recipient.email]
      reply_value = recipient_data[reference]
    end
    case comparator
    when '>'
      return true if reply_value > value
      return false
    when '>='
      return true if reply_value >= value
      return false
    when '<'
      return true if reply_value < value
      return false
    when '<='
      return true if reply_value <= value
      return false
    when '='
      return true if reply_value == value
      return false
    when '!='
      return true if reply_value != value
      return false
    else
      return false
    end
  end
end
