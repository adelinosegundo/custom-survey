class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :order
      t.references :survey, index: true, foreign_key: true
      
      t.timestamps null: false

      t.actable
    end
  end
end
