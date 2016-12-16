class AddTagValidationFieldToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :avaliable_tags, :string, array: true, default: []
    add_column :surveys, :email_tag, :string
  end
end
