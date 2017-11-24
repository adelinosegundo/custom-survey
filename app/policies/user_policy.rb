class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
    admin?
  end

  def create?
    admin?
  end

  def invite?
    admin?
  end

  def update?
     owner? || admin?
  end

  def destroy?
    admin?
  end

  private

  def owner?
    @user.id == @record.id
  end
end
