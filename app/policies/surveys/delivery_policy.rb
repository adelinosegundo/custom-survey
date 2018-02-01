class Surveys::DeliveryPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
    owner? || collaborator?
  end

  def update?
    (owner? || collaborator?)
  end

  def perform?
    owner? && @record.mail_message.ready?
  end

  private

  def owner?
    @user.has_cached_role?(:owner, @record)
  end

  def collaborator?
    @user.has_cached_role?(:collaborator, @record)
  end
end

