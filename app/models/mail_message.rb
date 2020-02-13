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
    # if self.recipients.undelivered.size > 100
    #  self.delay_for(1.hour, retry: false).deliver recipient_id
    # end
    # .limit(100)


    _recipients = self.recipients.undelivered
    _recipients = _recipients.where(id: recipient_id) if recipient_id
    _recipients.collect do |recipient|
      SuportMailer.deliver_survey_mail_message(recipient).deliver_later!
    end
  end

  def ready?
    !self.subject.blank? && !self.content.blank?
  end
end
