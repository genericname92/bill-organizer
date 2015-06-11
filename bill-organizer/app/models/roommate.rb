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
#  from_date  :date             not null
#  end_date   :date             not null
#

class Roommate < ActiveRecord::Base
  belongs_to :bill
  validates :email, :paid, :from_date, :end_date, presence: true
end
