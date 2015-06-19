class Comment < ActiveRecord::Base
  validates :body, presence: true
  belongs_to :user, class_name: "User", primary_key: :id, foreign_key: :owner_id
  belongs_to :bill
end
