class SurveyPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
    true
  end

  def create?
    true
  end

  def results?
    (owner? || collaborator?) && @record.recipients.answered.any?
  end

  def invite?
    owner?
  end

  def destroy?
    owner?
  end

  def edit_questions?
    update?
  end

  def update_questions?
    update?
  end

  def update?
    (owner? || collaborator?) && @record.recipients.answered.empty?
  end

  private

  def owner?
    @user.has_cached_role?(:owner, @record)
  end

  def collaborator?
    @user.has_cached_role?(:collaborator, @record)
  end
end
