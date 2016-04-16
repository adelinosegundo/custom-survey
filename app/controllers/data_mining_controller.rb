class DataMiningController < ApplicationController
  def index
  end

  def mine_users
    GithubUser.delay.mine
    redirect_to data_mining_index_path notice: "Mining Started"
  end

  def destroy_all
    GithubUser.destroy_all
    redirect_to data_mining_index_path notice: "Destroyed"
  end
end
