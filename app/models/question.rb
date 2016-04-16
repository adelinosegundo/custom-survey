class Question < ActiveRecord::Base
  actable
  acts_as :item
end
