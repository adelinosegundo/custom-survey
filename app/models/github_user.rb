# == Schema Information
#
# Table name: github_users
#
#  id                  :integer          not null, primary key
#  github_uid          :string
#  github_type         :string
#  login               :string
#  avatar_url          :string
#  gravatar_id         :string
#  url                 :string
#  html_url            :string
#  followers_url       :string
#  following_url       :string
#  gists_url           :string
#  starred_url         :string
#  subscriptions_url   :string
#  organizations_url   :string
#  repos_url           :string
#  events_url          :string
#  received_events_url :string
#  site_admin          :boolean
#  name                :string
#  company             :string
#  blog                :string
#  location            :string
#  email               :string
#  hireable            :boolean
#  bio                 :string
#  public_repos        :integer
#  public_gists        :integer
#  followers           :integer
#  following           :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  user_hash           :string
#  private_gists       :string
#  total_private_repos :string
#  owned_private_repos :string
#  disk_usage          :string
#  collaborators       :string
#  plan                :json
#

class GithubUser < ActiveRecord::Base
  has_many :replies

  def self.mine till=300
    while GithubUser.all.size < till
      github = Github.new oauth_token: ENV['GITHUB_OAUTH_TOKEN']
      users_starting_number = get_new_user_id
      users_data = github.users.list since: users_starting_number
      users_data.each_with_index do |user_data, index|
        github_user = GithubUser.find_or_initialize_by(github_uid: user_data["id"].to_s)
        user_full_data = github.users.get(user:user_data["login"]).to_hash
        user_full_data["github_type"] = user_full_data.delete("type") if user_full_data["type"]
        user_full_data["github_uid"] = user_full_data.delete("id") if user_full_data["id"]
        github_user.attributes=user_full_data
        github_user.save if github_user.email
      end
    end
    true
  end

  def self.get_new_user_id
    uid = rand(15205150).to_s 
    begin
      GithubUser.find_by github_uid: uid
    rescue Exception => e
      return uid
    else
      return get_new_user_id
    end
  end


  def self.mine_default
    github_user = GithubUser.find_or_initialize_by(login: "adelinosegundo")
    github = Github.new oauth_token: ENV['GITHUB_OAUTH_TOKEN']
    user_full_data = github.users.get("adelinosegundo").to_hash
    puts user_full_data
    user_full_data["github_type"] = user_full_data.delete("type") if user_full_data["type"]
    user_full_data["github_uid"] = user_full_data.delete("id") if user_full_data["id"]
    github_user.attributes=user_full_data
    github_user.email = "adelinosegundo@gmail.com"
    github_user.save
  end
end
