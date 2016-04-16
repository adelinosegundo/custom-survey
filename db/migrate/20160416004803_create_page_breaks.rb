class CreatePageBreaks < ActiveRecord::Migration
  def change
    create_table :page_breaks do |t|

      t.timestamps null: false
    end
  end
end
