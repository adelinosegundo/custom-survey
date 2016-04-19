class CreateRecipients < ActiveRecord::Migration
  def change
    create_table :recipients do |t|
      t.string :email
      t.boolean :subscribed

      t.actable
      t.timestamps null: false
    end
  end
end
