class ApplicationController < ActionController::Base
  include Pundit
  include PolicyHelper
  protect_from_forgery with: :exception

  layout :layout_by_resource

  # POST /unsubscribe?:id
  def unsubscribe
  end

  private

  def layout_by_resource
    if devise_controller? && !current_user
      "public"
    else
      "application"
    end
  end
end
