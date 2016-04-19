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
end
