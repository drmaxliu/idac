# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0)
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  name                   :string(255)
#  bot                    :date
#  test_date              :date
#  total_score            :integer
#  subscore_1             :integer
#  subscore_2             :integer
#  subscore_3             :integer
#  subscore_4             :integer
#  subscore_5             :integer
#  subscore_6             :integer
#  description            :text
#  school                 :text
#  contact                :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  status                 :integer
#  level                  :integer
#  answer                 :text
#

require 'spec_helper'

describe User do
  pending "add some examples to (or delete) #{__FILE__}"
end
