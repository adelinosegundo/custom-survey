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

ActiveRecord::Schema.define(version: 20160426184813) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alternatives", force: :cascade do |t|
    t.string   "value"
    t.integer  "multiple_choice_question_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

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

  create_table "github_repo_users", force: :cascade do |t|
    t.integer  "github_user_id"
    t.integer  "github_repo_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "github_repo_users", ["github_repo_id"], name: "index_github_repo_users_on_github_repo_id", using: :btree
  add_index "github_repo_users", ["github_user_id"], name: "index_github_repo_users_on_github_user_id", using: :btree

  create_table "github_repos", force: :cascade do |t|
    t.string   "name"
    t.string   "link"
    t.string   "language"
    t.string   "kind"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "github_users", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer  "sequence"
    t.integer  "survey_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "actable_id"
    t.string   "actable_type"
  end

  add_index "items", ["survey_id"], name: "index_items_on_survey_id", using: :btree

  create_table "logs", force: :cascade do |t|
    t.string   "action"
    t.string   "value"
    t.integer  "question_number"
    t.integer  "reply_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "logs", ["reply_id"], name: "index_logs_on_reply_id", using: :btree

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

  create_table "page_breaks", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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
    t.boolean  "subscribed",   default: true
    t.integer  "actable_id"
    t.string   "actable_type"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "replies", force: :cascade do |t|
    t.string   "link_hash"
    t.json     "answers"
    t.integer  "mail_message_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "recipient_id"
  end

  add_index "replies", ["mail_message_id"], name: "index_replies_on_mail_message_id", using: :btree
  add_index "replies", ["recipient_id"], name: "index_replies_on_recipient_id", using: :btree

  create_table "surveys", force: :cascade do |t|
    t.string   "name"
    t.string   "title"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "recipient_kind"
  end

  add_foreign_key "alternatives", "multiple_choice_questions"
  add_foreign_key "github_repo_users", "github_repos"
  add_foreign_key "github_repo_users", "github_users"
  add_foreign_key "items", "surveys"
  add_foreign_key "logs", "replies"
  add_foreign_key "mail_messages", "surveys"
  add_foreign_key "replies", "mail_messages"
end
