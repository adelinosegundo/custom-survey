class AddRecipientKindToSurveys < ActiveRecord::Migration
  def change
    add_column :surveys, :recipient_kind, :string
  end
end
