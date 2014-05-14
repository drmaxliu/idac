# == Schema Information
#
# Table name: testers
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  total_score :integer
#  test_date   :datetime
#  birthday    :datetime
#  sub_score_1 :integer
#  sub_score_2 :integer
#  sub_score_3 :integer
#  sub_score_4 :integer
#  sub_score_5 :integer
#  sub_score_6 :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  dob         :date
#

require 'spec_helper'

describe Tester do
  pending "add some examples to (or delete) #{__FILE__}"
end
