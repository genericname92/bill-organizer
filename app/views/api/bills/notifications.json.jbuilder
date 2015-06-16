json.array! @bills do |bill|
  json.id bill.id
  json.owner_id bill.owner_id
  json.title bill.title
  json.bill_type bill.bill_type
  json.amount bill.amount
  json.from_date bill.from_date
  json.end_date bill.end_date
  json.created_at bill.created_at
  json.updated_at bill.updated_at

  json.notifications bill.follows do |notification|
    if notification.user_id == current_user.id
      json.id notification.id
      json.bill_id notification.bill_id
      json.user_id notification.user_id
      json.viewed notification.viewed
      json.created_at notification.created_at
      json.updated_at notification.updated_at
    end
  end
end
