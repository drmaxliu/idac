require 'spec_helper'

describe "testers/show" do
  before(:each) do
    @tester = assign(:tester, stub_model(Tester,
      :name => "Name",
      :total_score => 1,
      :sub_score_1 => 2,
      :sub_score_2 => 3,
      :sub_score_3 => 4,
      :sub_score_4 => "",
      :sub_score_5 => 5,
      :sub_score_6 => 6
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/3/)
    rendered.should match(/4/)
    rendered.should match(//)
    rendered.should match(/5/)
    rendered.should match(/6/)
  end
end
