require 'spec_helper'

describe "questions/index" do
  before(:each) do
    assign(:questions, [
      stub_model(Question,
        :content => "MyText",
        :choices => "MyText",
        :answer => "MyText",
        :difficulty => 1,
        :std_error => 2,
        :discrimination => 3
      ),
      stub_model(Question,
        :content => "MyText",
        :choices => "MyText",
        :answer => "MyText",
        :difficulty => 1,
        :std_error => 2,
        :discrimination => 3
      )
    ])
  end

  it "renders a list of questions" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
