class AddUserDataFileToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :users_data_file, :string
  end
end
