require 'spec_helper'

describe "tester_answers/edit" do
  before(:each) do
    @tester_answer = assign(:tester_answer, stub_model(TesterAnswer,
      :answer => "MyText",
      :score => 1,
      :ability => 1,
      :std_error => 1
    ))
  end

  it "renders the edit tester_answer form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => tester_answers_path(@tester_answer), :method => "post" do
      assert_select "textarea#tester_answer_answer", :name => "tester_answer[answer]"
      assert_select "input#tester_answer_score", :name => "tester_answer[score]"
      assert_select "input#tester_answer_ability", :name => "tester_answer[ability]"
      assert_select "input#tester_answer_std_error", :name => "tester_answer[std_error]"
    end
  end
end
