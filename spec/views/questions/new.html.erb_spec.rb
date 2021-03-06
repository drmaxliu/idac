require 'spec_helper'

describe "questions/new" do
  before(:each) do
    assign(:question, stub_model(Question,
      :content => "MyText",
      :choices => "MyText",
      :answer => "MyText",
      :difficulty => 1,
      :std_error => 1,
      :discrimination => 1
    ).as_new_record)
  end

  it "renders new question form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => questions_path, :method => "post" do
      assert_select "textarea#question_content", :name => "question[content]"
      assert_select "textarea#question_choices", :name => "question[choices]"
      assert_select "textarea#question_answer", :name => "question[answer]"
      assert_select "input#question_difficulty", :name => "question[difficulty]"
      assert_select "input#question_std_error", :name => "question[std_error]"
      assert_select "input#question_discrimination", :name => "question[discrimination]"
    end
  end
end
