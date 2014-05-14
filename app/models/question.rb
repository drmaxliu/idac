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

class Question < ActiveRecord::Base
  attr_accessible :answer, :choices, :content, :difficulty, :discrimination, :std_error
end
