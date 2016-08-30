class AddSendedToReply < ActiveRecord::Migration
  def change
    add_column :replies, :sended, :boolean, default: false
  end
end
