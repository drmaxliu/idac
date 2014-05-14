require 'spec_helper'

describe "testers/new" do
  before(:each) do
    assign(:tester, stub_model(Tester,
      :name => "MyString",
      :total_score => 1,
      :sub_score_1 => 1,
      :sub_score_2 => 1,
      :sub_score_3 => 1,
      :sub_score_4 => "",
      :sub_score_5 => 1,
      :sub_score_6 => 1
    ).as_new_record)
  end

  it "renders new tester form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => testers_path, :method => "post" do
      assert_select "input#tester_name", :name => "tester[name]"
      assert_select "input#tester_total_score", :name => "tester[total_score]"
      assert_select "input#tester_sub_score_1", :name => "tester[sub_score_1]"
      assert_select "input#tester_sub_score_2", :name => "tester[sub_score_2]"
      assert_select "input#tester_sub_score_3", :name => "tester[sub_score_3]"
      assert_select "input#tester_sub_score_4", :name => "tester[sub_score_4]"
      assert_select "input#tester_sub_score_5", :name => "tester[sub_score_5]"
      assert_select "input#tester_sub_score_6", :name => "tester[sub_score_6]"
    end
  end
end
