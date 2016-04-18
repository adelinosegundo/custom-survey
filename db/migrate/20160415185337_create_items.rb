class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :sequence
      t.references :survey, index: true, foreign_key: true
      
      t.timestamps null: false

      t.actable null: false
    end
  end
end
