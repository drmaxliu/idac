require 'spec_helper'

describe "testers/index" do
  before(:each) do
    assign(:testers, [
      stub_model(Tester,
        :name => "Name",
        :total_score => 1,
        :sub_score_1 => 2,
        :sub_score_2 => 3,
        :sub_score_3 => 4,
        :sub_score_4 => "",
        :sub_score_5 => 5,
        :sub_score_6 => 6
      ),
      stub_model(Tester,
        :name => "Name",
        :total_score => 1,
        :sub_score_1 => 2,
        :sub_score_2 => 3,
        :sub_score_3 => 4,
        :sub_score_4 => "",
        :sub_score_5 => 5,
        :sub_score_6 => 6
      )
    ])
  end

  it "renders a list of testers" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
    assert_select "tr>td", :text => "".to_s, :count => 2
    assert_select "tr>td", :text => 5.to_s, :count => 2
    assert_select "tr>td", :text => 6.to_s, :count => 2
  end
end
