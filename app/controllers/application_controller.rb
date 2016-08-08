class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :layout_by_resource

  # POST /unsubscribe?:id
  def unsubscribe
  end

  private

  def layout_by_resource
    if devise_controller? and not user_signed_in?
      "public"
    else
      "application"
    end
  end
end
