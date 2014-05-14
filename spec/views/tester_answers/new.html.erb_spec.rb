require 'spec_helper'

describe "tester_answers/new" do
  before(:each) do
    assign(:tester_answer, stub_model(TesterAnswer,
      :answer => "MyText",
      :score => 1,
      :ability => 1,
      :std_error => 1
    ).as_new_record)
  end

  it "renders new tester_answer form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => tester_answers_path, :method => "post" do
      assert_select "textarea#tester_answer_answer", :name => "tester_answer[answer]"
      assert_select "input#tester_answer_score", :name => "tester_answer[score]"
      assert_select "input#tester_answer_ability", :name => "tester_answer[ability]"
      assert_select "input#tester_answer_std_error", :name => "tester_answer[std_error]"
    end
  end
end
