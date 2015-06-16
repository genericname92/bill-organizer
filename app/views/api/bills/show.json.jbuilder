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
