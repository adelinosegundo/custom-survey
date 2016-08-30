class DropActableFromRecipient < ActiveRecord::Migration
  def change
  	remove_column :recipients, :actable_type
  	remove_column :recipients, :actable_id
  end
end
