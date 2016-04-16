# == Schema Information
#
# Table name: page_breaks
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class PageBreak < ActiveRecord::Base
  acts_as :item
end
