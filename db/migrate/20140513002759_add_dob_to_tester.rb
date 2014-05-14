class AddDobToTester < ActiveRecord::Migration
  def change
    add_column :testers, :dob, :date
  end
end
