class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :content
      t.text :choices
      t.text :answer
      t.integer :difficulty
      t.integer :std_error
      t.integer :discrimination

      t.timestamps
    end
  end
end
