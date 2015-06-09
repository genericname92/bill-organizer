# == Schema Information
#
# Table name: roommates
#
#  id         :integer          not null, primary key
#  bill_id    :integer          not null
#  email      :string           not null
#  paid       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class RoommateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
