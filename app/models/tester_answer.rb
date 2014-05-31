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

class TesterAnswer < ActiveRecord::Base
  attr_accessible :ability, :answer, :score, :std_error, :user_id

  belongs_to :user
  validates :user_id, presence: :true
end
