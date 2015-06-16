# == Schema Information
#
# Table name: follows
#
#  id         :integer          not null, primary key
#  bill_id    :integer          not null
#  user_id    :integer          not null
#  viewed     :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Follow < ActiveRecord::Base
  belongs_to :user
  belongs_to :bill
  validates :bill_id, :user_id, presence: true
  validates :bill_id, uniqueness: { scope: :user_id }
  validates :viewed, inclusion: { in: [true, false]}
end
