require 'spec_helper'

describe "tester_answers/show" do
  before(:each) do
    @tester_answer = assign(:tester_answer, stub_model(TesterAnswer,
      :answer => "MyText",
      :score => 1,
      :ability => 2,
      :std_error => 3
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/MyText/)
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/3/)
  end
end
