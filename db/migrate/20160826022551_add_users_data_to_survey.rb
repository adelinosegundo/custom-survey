class AddUsersDataToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :users_data, :json
  end
end
