class CreateMailMessages < ActiveRecord::Migration
  def change
    create_table :mail_messages do |t|
      t.string :subject
      t.text :content
      t.references :survey, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
