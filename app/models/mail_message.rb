# == Schema Information
#
# Table name: mail_messages
#
#  id         :integer          not null, primary key
#  subject    :string
#  content    :text
#  survey_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_mail_messages_on_survey_id  (survey_id)
#
# Foreign Keys
#
#  fk_rails_7fc27c3ffc  (survey_id => surveys.id)
#

class MailMessage < ActiveRecord::Base
  belongs_to :survey

  has_many :recipients, through: :survey

  # after_save :setup_recipients

  # def setup_recipients
  #   survey.create_recipients if self.ready? && survey.recipients.empty?
  # end

  def deliver recipient_id
    self.recipients
      .undelivered
      .where(id: recipient_id ? [recipient_id] : self.recipients.pluck(:id))
      .collect{ |recipient| SuportMailer.deliver_survey_mail_message(recipient).deliver_later }
  end

  def ready?
    !self.subject.blank? && !self.content.blank?
  end
end
