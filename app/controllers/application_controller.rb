class ApplicationController < ActionController::Base
  include Pundit
  include PolicyHelper
  protect_from_forgery with: :exception

  layout :layout_by_resource

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # POST /unsubscribe?:id
  def unsubscribe
  end

  private

  def user_not_authorized
    redirect_to root_path, notice: "Não autorizado!", flash: { status: 'error' }
  end

  def layout_by_resource
    if devise_controller? && !current_user
      "public"
    else
      "application"
    end
  end
end
