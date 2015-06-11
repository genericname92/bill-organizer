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
  json.id roommate.id
  json.bill_id roommate.bill_id
  json.email roommate.email
  json.paid roommate.paid
  json.from_date roommate.from_date
  json.end_date roommate.end_date
  json.created_at roommate.created_at
  json.updated_at roommate.updated_at
end
