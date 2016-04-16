class Item < ActiveRecord::Base
  actable
  
  belongs_to :survey
end
