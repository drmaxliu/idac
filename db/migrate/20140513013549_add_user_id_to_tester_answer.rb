class AddUserIdToTesterAnswer < ActiveRecord::Migration
  def change
    add_column :tester_answers, :user_id, :integer
  end
end
