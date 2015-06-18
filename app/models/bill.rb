# == Schema Information
#
# Table name: bills
#
#  id          :integer          not null, primary key
#  owner_id    :integer
#  title       :string           not null
#  bill_type   :string
#  amount      :decimal(8, 2)
#  from_date   :date             not null
#  end_date    :date             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  show_string :string
#

class Bill < ActiveRecord::Base
  include Calculatable
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
  after_initialize :ensure_show_string

  def date_durations
    return if from_date == nil || end_date == nil
    if from_date - end_date > 0
      errors.add(:duration, "End date cannot be before Start Date")
    end
  end

  def ensure_show_string
    self.show_string ||= SecureRandom.urlsafe_base64(8)
  end
end
