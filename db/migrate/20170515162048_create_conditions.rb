class CreateConditions < ActiveRecord::Migration
  def change
    create_table :conditions do |t|
      t.string :reference_type
      t.string :reference
      t.string :comparator
      t.string :value
      t.integer :conditionable_id
      t.string :conditionable_type

      t.timestamps null: false
    end
  end
end
