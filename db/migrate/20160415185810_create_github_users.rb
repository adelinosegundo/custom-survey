class CreateGithubUsers < ActiveRecord::Migration
  def change
    create_table :github_users do |t|
      t.boolean :active
      t.string :github_uid
      t.string :github_type
      t.string :login
      t.string :email
      t.string :avatar_url
      t.string :gravatar_id
      t.string :url
      t.string :html_url
      t.string :followers_url
      t.string :following_url
      t.string :gists_url
      t.string :starred_url
      t.string :subscriptions_url
      t.string :organizations_url
      t.string :repos_url
      t.string :events_url
      t.string :received_events_url
      t.boolean :site_admin
      t.string :name
      t.string :company
      t.string :blog
      t.string :location
      t.boolean :hireable
      t.string :bio
      t.integer :public_repos
      t.integer :public_gists
      t.integer :followers
      t.integer :following
      t.datetime :created_at
      t.datetime :updated_at
      t.string :user_hash
      t.string :private_gists
      t.string :total_private_repos
      t.string :owned_private_repos
      t.string :disk_usage
      t.string :collaborators
      t.json :plan


      t.timestamps null: false
    end
  end
end
