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
end
