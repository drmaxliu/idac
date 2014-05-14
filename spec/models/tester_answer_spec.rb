# == Schema Information
#
# Table name: tester_answers
#
#  id         :integer          not null, primary key
#  answer     :text
#  score      :integer
#  ability    :integer
#  std_error  :integer
#  tester_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

require 'spec_helper'

describe TesterAnswer do
  pending "add some examples to (or delete) #{__FILE__}"
end
