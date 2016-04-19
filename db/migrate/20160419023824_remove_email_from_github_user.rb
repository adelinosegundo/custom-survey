class RemoveEmailFromGithubUser < ActiveRecord::Migration
  def change
    remove_column :github_users, :email
  end
end
