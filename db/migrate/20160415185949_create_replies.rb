class CreateReplies < ActiveRecord::Migration
  def change
    create_table :replies do |t|
      t.string :link_hash
      t.json :answers
      t.references :mail_message, index: true, foreign_key: true
      t.references :github_user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
