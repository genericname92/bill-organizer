# == Schema Information
#
# Table name: bills
#
#  id         :integer          not null, primary key
#  owner_id   :integer
#  title      :string           not null
#  type       :string
#  amount     :decimal(8, 2)
#  from_date  :date             not null
#  end_date   :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BillTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
