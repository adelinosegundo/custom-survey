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

ActiveRecord::Schema.define(version: 20160416004803) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alternatives", force: :cascade do |t|
    t.string   "value"
    t.integer  "multiple_choice_question_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "alternatives", ["multiple_choice_question_id"], name: "index_alternatives_on_multiple_choice_question_id", using: :btree

  create_table "github_users", force: :cascade do |t|
    t.string   "github_uid"
    t.string   "github_type"
    t.string   "login"
    t.string   "avatar_url"
    t.string   "gravatar_id"
    t.string   "url"
    t.string   "html_url"
    t.string   "followers_url"
    t.string   "following_url"
    t.string   "gists_url"
    t.string   "starred_url"
    t.string   "subscriptions_url"
    t.string   "organizations_url"
    t.string   "repos_url"
    t.string   "events_url"
    t.string   "received_events_url"
    t.boolean  "site_admin"
    t.string   "name"
    t.string   "company"
    t.string   "blog"
    t.string   "location"
    t.string   "email"
    t.boolean  "hireable"
    t.string   "bio"
    t.integer  "public_repos"
    t.integer  "public_gists"
    t.integer  "followers"
    t.integer  "following"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "user_hash"
    t.string   "private_gists"
    t.string   "total_private_repos"
    t.string   "owned_private_repos"
    t.string   "disk_usage"
    t.string   "collaborators"
    t.json     "plan"
  end

  create_table "images", force: :cascade do |t|
    t.string   "file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.integer  "order"
    t.integer  "survey_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "actable_id"
    t.string   "actable_type"
  end

  add_index "items", ["survey_id"], name: "index_items_on_survey_id", using: :btree

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
    t.boolean  "accepts_mutiple"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
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
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.integer  "actable_id"
    t.string   "actable_type"
  end

  create_table "replies", force: :cascade do |t|
    t.string   "link_hash"
    t.json     "answers"
    t.integer  "survey_id"
    t.integer  "mail_message_id"
    t.integer  "github_user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "replies", ["github_user_id"], name: "index_replies_on_github_user_id", using: :btree
  add_index "replies", ["mail_message_id"], name: "index_replies_on_mail_message_id", using: :btree
  add_index "replies", ["survey_id"], name: "index_replies_on_survey_id", using: :btree

  create_table "surveys", force: :cascade do |t|
    t.string   "name"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "alternatives", "multiple_choice_questions"
  add_foreign_key "items", "surveys"
  add_foreign_key "mail_messages", "surveys"
  add_foreign_key "replies", "github_users"
  add_foreign_key "replies", "mail_messages"
  add_foreign_key "replies", "surveys"
end
