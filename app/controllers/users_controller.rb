class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    authorize_namespace User
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    authorize_namespace @user
  end

  # GET /users/new
  def new
    authorize_namespace User
    @user = User.new
  end

  # GET /users/1/edit
  def edit
    authorize_namespace @user
  end

  # POST /users
  # POST /users.json
  def create
    authorize_namespace User
    @user = User.new(user_params)

    if @user.save
      redirect_to users_path, notice: 'User was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    authorize_namespace @user

    if @user.update(user_params)
      redirect_to users_path, notice: 'User was successfully created.'
    else
      render :edit
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    authorize_namespace @user

    @user.destroy
    redirect_to users_url, notice: 'User was successfully destroyed.'
  end

  def invite
    authorize_namespace User

    if request.get?
    else
      emails = invite_params[:emails].split(',').map(&:strip)
      User.invite_all emails
      redirect_to users_path, notice: "Users invited successfully."
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def invite_params
      params.require(:users).permit(:emails)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
