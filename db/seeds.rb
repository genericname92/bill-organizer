guest_user = User.create!(email: "guest", password: "password")
User.create!(email: "billClinton@example.com", password: "password")
User.create!(email: "billCosby@example.com", password: "password")
other_user = User.create!(email: "billGates@example.com", password: "password")

ele = Bill.create!(
  owner_id: guest_user.id,
  title: "June Electricity",
  bill_type: "Electricity",
  amount: 87.42,
  from_date: Time.now - 1.years,
  end_date: Time.now
)
ele2 = Bill.create!(
  owner_id: guest_user.id,
  title: "June Water",
  bill_type: "Water",
  amount: 115.42,
  from_date: Time.now - 1.months,
  end_date: Time.now
)

ele3 = Bill.create!(
  owner_id: guest_user.id,
  title: "June Sewage",
  bill_type: "Sewage",
  amount: 45.42,
  from_date: Time.now - 1.months,
  end_date: Time.now
)

other_bill = Bill.create!(owner_id: other_user.id, title: "July Internet", bill_type: "Internet",
  amount: 75, from_date: 1.months.ago, end_date: Time.now)

Roommate.create!(
  bill_id: ele.id,
  email: "billCosby@example.com",
  from_date: Time.now - 1.years,
  end_date: Time.now - 6.months
)
Roommate.create!(
  bill_id: ele.id,
  email: "billClinton@example.com",
  from_date: Time.now - 1.years,
  end_date: Time.now - 9.months
)
Roommate.create!(
  bill_id: ele.id,
  email: "billGates@example.com",
  from_date: Time.now - 1.years,
  end_date: Time.now
)

Roommate.create!(
  bill_id: other_bill.id,
  email: "guest",
  from_date: 1.months.ago,
end_date: Time.now
)

Follow.create!(
  bill_id: other_bill.id,
  user_id: guest_user.id
)
