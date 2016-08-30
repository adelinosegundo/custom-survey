class DropRecipientKindFromSurvey < ActiveRecord::Migration
  def change
  	remove_column :surveys, :recipient_kind
  end
end
