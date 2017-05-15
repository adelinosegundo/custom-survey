class RemoveSurveyFromItems < ActiveRecord::Migration
  def change
    remove_reference :items, :survey, index: true, foreign_key: true
  end
end
