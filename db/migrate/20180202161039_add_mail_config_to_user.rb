class AddMailConfigToUser < ActiveRecord::Migration
  def change
    add_column :users, :mail_config, :jsonb
  end
end
