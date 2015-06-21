# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  body       :string
#  owner_id   :integer
#  bill_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :body, presence: true
  belongs_to :user, class_name: "User", primary_key: :id, foreign_key: :owner_id
  belongs_to :bill
end
