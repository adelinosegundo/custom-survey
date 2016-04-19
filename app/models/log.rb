# == Schema Information
#
# Table name: logs
#
#  id              :integer          not null, primary key
#  action          :string
#  value           :string
#  question_number :integer
#  reply_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Log < ActiveRecord::Base
  belongs_to :reply
end
