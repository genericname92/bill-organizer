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
  validate :date_durations
  has_many :roommates, dependent: :destroy
  has_many :follows
  has_many :tagged_users, through: :follows, source: :user
  belongs_to(
    :owner,
    class_name: "user",
    primary_key: "id",
    foreign_key: "owner_id",
  )

  def date_durations
    if from_date - end_date > 0
      errors.add(:duration, "End date cannot be before Start Date")
    end
  end
end
