# == Schema Information
#
# Table name: bills
#
#  id         :integer          not null, primary key
#  owner_id   :integer
#  title      :string           not null
#  bill_type  :string
#  amount     :decimal(8, 2)
#  from_date  :date             not null
#  end_date   :date             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Bill < ActiveRecord::Base
  validates :title, :bill_type, :owner_id, :amount, :from_date, :end_date, presence: true
  has_many :roommates
  belongs_to(
    :owner,
    class_name: "user",
    primary_key: "id",
    foreign_key: "owner_id",
  )
end
