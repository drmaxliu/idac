require 'spec_helper'

describe "tester_answers/index" do
  before(:each) do
    assign(:tester_answers, [
      stub_model(TesterAnswer,
        :answer => "MyText",
        :score => 1,
        :ability => 2,
        :std_error => 3
      ),
      stub_model(TesterAnswer,
        :answer => "MyText",
        :score => 1,
        :ability => 2,
        :std_error => 3
      )
    ])
  end

  it "renders a list of tester_answers" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
