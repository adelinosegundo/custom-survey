module Conditionable
  extend ActiveSupport::Concern

  included do
    has_many :conditions, as: :conditionable, dependent: :destroy
    accepts_nested_attributes_for :conditions, allow_destroy: true

    def compare_with_reply reply
      ([false] & self.conditions.map{ |condition| condition.compare(reply)}).empty?
    end
  end
end
