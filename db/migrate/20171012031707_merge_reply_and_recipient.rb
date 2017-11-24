class MergeReplyAndRecipient < ActiveRecord::Migration
  def change
    add_column :recipients, :sended, :boolean, default: false
    add_column :recipients, :link_hash, :string
    add_reference :recipients, :survey, foreign_key: true

    remove_reference :answers, :reply
    add_reference :answers, :recipient

    remove_reference :logs, :reply
    add_reference :logs, :recipient

    drop_table :replies
  end
end
