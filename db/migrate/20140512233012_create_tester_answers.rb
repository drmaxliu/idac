class CreateTesterAnswers < ActiveRecord::Migration
  def change
    create_table :tester_answers do |t|
      t.text :answer
      t.integer :score
      t.integer :ability
      t.integer :std_error
      t.integer :tester_id

      t.timestamps
    end
  end
end
