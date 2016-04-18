class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :number
      t.string :title
      t.text :description
      t.boolean :is_required

      t.timestamps null: false
    end
  end
end
