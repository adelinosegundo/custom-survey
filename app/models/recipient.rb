# == Schema Information
#
# Table name: recipients
#
#  id           :integer          not null, primary key
#  email        :string
#  subscribed   :boolean
#  actable_id   :integer
#  actable_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Recipient < ActiveRecord::Base
  actable

  KINDS = {
    "Github Users" => "GithubUser"
  }

  scope :active, -> { where(subscribed: true) }
  scope :avaliable, -> (mail_message_id) { where(actable_type: MailMessage.eager_load(:survey).find(mail_message_id).survey.recipient_kind ) }

  has_many :replies
  has_many :mail_messages, through: :replies


end
