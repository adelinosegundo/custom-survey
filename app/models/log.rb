# == Schema Information
#
# Table name: logs
#
#  id              :integer          not null, primary key
#  action          :string
#  value           :string
#  question_number :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  recipient_id    :integer
#

class Log < ActiveRecord::Base
  belongs_to :recipient
end
