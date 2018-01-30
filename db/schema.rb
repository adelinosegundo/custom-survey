# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171012052938) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alternatives", force: :cascade do |t|
    t.string   "value"
    t.integer  "multiple_choice_question_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "answers", force: :cascade do |t|
    t.string   "value"
    t.integer  "item_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "recipient_id"
  end

  add_index "answers", ["item_id"], name: "index_answers_on_item_id", using: :btree

  create_table "ckeditor_assets", force: :cascade do |t|
    t.string   "data_file_name",               null: false
    t.string   "data_content_type"
    t.integer  "data_file_size"
    t.integer  "assetable_id"
    t.string   "assetable_type",    limit: 30
    t.string   "type",              limit: 30
    t.integer  "width"
    t.integer  "height"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ckeditor_assets", ["assetable_type", "assetable_id"], name: "idx_ckeditor_assetable", using: :btree
  add_index "ckeditor_assets", ["assetable_type", "type", "assetable_id"], name: "idx_ckeditor_assetable_type", using: :btree

  create_table "conditions", force: :cascade do |t|
    t.string   "reference_type"
    t.string   "reference"
    t.string   "comparator"
    t.string   "value"
    t.integer  "conditionable_id"
    t.string   "conditionable_type"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer  "sequence"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "actable_id"
    t.string   "actable_type"
    t.integer  "page_id"
  end

  add_index "items", ["page_id"], name: "index_items_on_page_id", using: :btree

  create_table "logs", force: :cascade do |t|
    t.string   "action"
    t.string   "value"
    t.integer  "question_number"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "recipient_id"
  end

  create_table "mail_messages", force: :cascade do |t|
    t.string   "subject"
    t.text     "content"
    t.integer  "survey_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "mail_messages", ["survey_id"], name: "index_mail_messages_on_survey_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "multiple_choice_questions", force: :cascade do |t|
    t.integer  "number"
    t.string   "title"
    t.text     "description"
    t.boolean  "is_required"
    t.boolean  "accepts_multiple"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "pages", force: :cascade do |t|
    t.integer  "survey_id"
    t.integer  "sequence"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "pages", ["survey_id"], name: "index_pages_on_survey_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.integer  "number"
    t.string   "title"
    t.text     "description"
    t.boolean  "is_required"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "recipients", force: :cascade do |t|
    t.string   "email"
    t.boolean  "subscribed", default: true
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "sended",     default: false
    t.string   "link_hash"
    t.integer  "survey_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "surveys", force: :cascade do |t|
    t.string   "name"
    t.string   "title"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.json     "users_data"
    t.string   "avaliable_tags",  default: [],              array: true
    t.string   "email_tag"
    t.string   "users_data_file"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.integer  "invited_by_id"
    t.string   "invited_by_type"
    t.integer  "invitations_count",      default: 0
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
  add_index "users", ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
  add_index "users", ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

  add_foreign_key "alternatives", "multiple_choice_questions"
  add_foreign_key "answers", "items"
  add_foreign_key "items", "pages"
  add_foreign_key "mail_messages", "surveys"
  add_foreign_key "pages", "surveys"
  add_foreign_key "recipients", "surveys"
end
