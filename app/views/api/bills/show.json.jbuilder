json.extract!(
  @bill,
  :id,
  :owner_id,
  :title,
  :bill_type,
  :amount,
  :from_date,
  :end_date,
  :created_at,
  :updated_at
)

json.roommates @bill.roommates do |roommate|
  json.extract! roommate, :id, :bill_id, :email, :paid, :from_date, :end_date, :created_at, :updated_at
end

json.taggedUsers @bill.tagged_users do |user|
  json.extract! user, :id
end

json.comments @bill.comments do |comment|
  json.extract! comment, :id, :bill_id, :owner_id, :created_at, :updated_at, :body
  json.timeAgo time_ago_in_words(comment.created_at)
end
