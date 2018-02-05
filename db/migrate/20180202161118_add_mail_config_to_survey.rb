class AddMailConfigToSurvey < ActiveRecord::Migration
  def change
    add_column :surveys, :mail_config, :jsonb
  end
end
