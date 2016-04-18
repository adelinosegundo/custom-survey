class CreateAlternatives < ActiveRecord::Migration
  def change
    create_table :alternatives do |t|
      t.string :value
      t.references :multiple_choice_question, index: false, foreign_key: true

      t.timestamps null: false
    end
  end
end
