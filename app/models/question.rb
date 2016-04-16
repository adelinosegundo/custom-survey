# == Schema Information
#
# Table name: questions
#
#  id           :integer          not null, primary key
#  number       :integer
#  title        :string
#  description  :text
#  is_required  :boolean
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  actable_id   :integer
#  actable_type :string
#

class Question < ActiveRecord::Base
  actable
  acts_as :item
end
