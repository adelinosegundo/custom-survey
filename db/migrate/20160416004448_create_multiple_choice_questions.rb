class CreateMultipleChoiceQuestions < ActiveRecord::Migration
  def change
    create_table :multiple_choice_questions do |t|
      t.boolean :accepts_mutiple

      t.timestamps null: false
    end
  end
end
