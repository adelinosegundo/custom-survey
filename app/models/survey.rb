# == Schema Information
#
# Table name: surveys
#
#  id              :integer          not null, primary key
#  name            :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  users_data      :json
#  avaliable_tags  :string           default([]), is an Array
#  email_tag       :string
#  users_data_file :string
#

class Survey < ActiveRecord::Base
  resourcify

  has_one :mail_message, dependent: :destroy

  has_many :recipients

  has_many :pages, -> { order(:sequence) }, dependent: :destroy
  has_many :items, through: :pages, dependent: :destroy
  accepts_nested_attributes_for :pages, allow_destroy: true
  accepts_nested_attributes_for :recipients

  validates :name, :title, :users_data_file, :users_data, :email_tag, presence: true

  mount_uploader :users_data_file, UsersDataUploader

  before_validation :tags_and_json_from_csv

  before_create :build_mail_message

  def create_recipients
    active_recipients_emails.each do |email|
      self.recipients.build(
        email: email,
        link_hash: Digest::MD5.hexdigest(self.id.to_s+email)
      ).save
    end
  end

  def active_recipients_emails
    Recipient.filter_inactive(self.users_data_mails)
  end

  def users_data_mails
    self.users_data.keys
  end

  def tags_and_json_from_csv
    filename = self.users_data_file.current_path
    file = File.open(filename, "rb")
    csv = file.read.gsub(/\r/, '').gsub(';', ',')
    csv_data =  CSV.parse(csv)

    result_json = {}

    tags = csv_data[0]

    main_index = tags.index(email_tag)

    return false unless main_index

    csv_data[1..-1].each do |csv_row|
      key = csv_row[main_index]
      result_json[key] = {}
      tags.each_with_index do |tag, i|
        result_json[key][tag] = csv_row[i].force_encoding('ISO-8859-1')
      end
    end

    self.avaliable_tags = tags
    self.users_data = result_json

    return true
  end

  def get_page_for_recipient recipient, page_number
    i = 0
    self.pages.each do |page|
      # if page.compare_with_recipient(recipient)
      #   i += 1
      # end
      i += 1
      return page if i == page_number
    end
  end

  def next_page_for_recipient recipient, page_number
    i = 0
    self.pages.each do |page|
      # if page.compare_with_recipient(recipient)
      #   i += 1
      # end
      i += 1
      return i if i == page_number+1
    end

    return false
  end
end
