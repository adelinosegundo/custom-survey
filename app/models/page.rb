class Page < ActiveRecord::Base
  include Conditionable
  
  belongs_to :survey

  has_many :items, -> { order(:sequence) }, dependent: :destroy
  accepts_nested_attributes_for :items, allow_destroy: true
end
