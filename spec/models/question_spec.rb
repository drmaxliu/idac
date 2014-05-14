# == Schema Information
#
# Table name: questions
#
#  id             :integer          not null, primary key
#  content        :text
#  choices        :text
#  answer         :text
#  difficulty     :integer
#  std_error      :integer
#  discrimination :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'spec_helper'

describe Question do
  pending "add some examples to (or delete) #{__FILE__}"
end
