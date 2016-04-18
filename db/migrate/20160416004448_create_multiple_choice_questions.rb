class CreateMultipleChoiceQuestions < ActiveRecord::Migration
  def change
    create_table :multiple_choice_questions do |t|
      t.integer :number
      t.string :title
      t.text :description
      t.boolean :is_required
      t.boolean :accepts_multiple

      t.timestamps null: false
    end
  end
end
