class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.string :action
      t.string :value
      t.integer :question_number
      t.references :reply, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
