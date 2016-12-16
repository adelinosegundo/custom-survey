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

class MailMessage < ActiveRecord::Base
  belongs_to :survey

  has_many :replies, dependent: :destroy
  has_many :recipients, through: :replies

  after_create :create_replies

  def create_replies
    self.recipients_avaliable.each do |recipient|
      self.replies.build(recipient: recipient, link_hash: Digest::MD5.hexdigest(recipient.id.to_s)).save
    end
  end
  
  def deliver reply_id
    self.replies.undelivered
      .where(id: reply_id ? [reply_id] : self.replies.pluck(:id))
      .collect{ |reply| SuportMailer.deliver_survey_mail_message(reply).deliver_later }
  end

  def recipients_avaliable
    Recipient.active.where(email: self.survey.users_data_mails)
  end

  def recipients_that_replied
  end
end
