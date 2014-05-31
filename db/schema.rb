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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140531042934) do

  create_table "questions", :force => true do |t|
    t.text     "content"
    t.text     "choices"
    t.text     "answer"
    t.integer  "difficulty"
    t.integer  "std_error"
    t.integer  "discrimination"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "tester_answers", :force => true do |t|
    t.text     "answer"
    t.integer  "score"
    t.integer  "ability"
    t.integer  "std_error"
    t.integer  "tester_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "user_id"
  end

  create_table "testers", :force => true do |t|
    t.string   "name"
    t.integer  "total_score"
    t.datetime "test_date"
    t.datetime "birthday"
    t.integer  "sub_score_1"
    t.integer  "sub_score_2"
    t.integer  "sub_score_3"
    t.integer  "sub_score_4"
    t.integer  "sub_score_5"
    t.integer  "sub_score_6"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.date     "dob"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.date     "bot"
    t.date     "test_date"
    t.integer  "total_score"
    t.integer  "subscore_1"
    t.integer  "subscore_2"
    t.integer  "subscore_3"
    t.integer  "subscore_4"
    t.integer  "subscore_5"
    t.integer  "subscore_6"
    t.text     "description"
    t.text     "school"
    t.string   "contact"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.integer  "status"
    t.integer  "level"
    t.text     "answer"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
