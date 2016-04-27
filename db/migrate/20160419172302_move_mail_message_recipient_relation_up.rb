class MoveMailMessageRecipientRelationUp < ActiveRecord::Migration
  def change
    add_reference(:replies, :recipient, index: true)
  end
end
