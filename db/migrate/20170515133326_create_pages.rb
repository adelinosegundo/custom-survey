class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.references :survey, index: true, foreign_key: true
      t.integer :sequence
      t.string :title

      t.timestamps null: false
    end
    add_reference :items, :page, index: true, foreign_key: true
  end

  def data
    Item.where(actable_type: "PageBreak").destroy_all
    Survey.all.each do |survey|
      page = Page.create survey: survey, sequence: 1
      Item.where(survey_id: survey.id).update_all page_id: page.id
    end
  end
end
