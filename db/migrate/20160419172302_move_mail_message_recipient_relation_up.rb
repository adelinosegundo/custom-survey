class MoveMailMessageRecipientRelationUp < ActiveRecord::Migration
  def change
    remove_reference(:replies, :github_user, index: true)
    add_reference(:replies, :recipient, index: true)
  end
end
