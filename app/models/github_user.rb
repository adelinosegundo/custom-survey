class GithubUser < ActiveRecord::Base
  has_many :replies
end
