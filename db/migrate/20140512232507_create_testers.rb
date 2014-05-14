class CreateTesters < ActiveRecord::Migration
  def change
    create_table :testers do |t|
      t.string :name
      t.integer :total_score
      t.datetime :test_date
      t.datetime :birthday
      t.integer :sub_score_1
      t.integer :sub_score_2
      t.integer :sub_score_3
      t.integer :sub_score_4
      t.integer :sub_score_5
      t.integer :sub_score_6

      t.timestamps
    end
  end
end
