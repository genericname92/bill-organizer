json.bills @bills do |bill|
  json.id bill.id
  json.owner_id bill.owner_id
  json.title bill.title
  json.bill_type bill.bill_type
  json.amount bill.amount
  json.from_date bill.from_date
  json.end_date bill.end_date
  json.created_at bill.created_at
  json.updated_at bill.updated_at
end
