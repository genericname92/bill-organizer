User.all.destroy_all
Bill.all.destroy_all
Roommate.all.destroy_all
guest_user = User.create!(email: "guest", password: "password")
ele = Bill.create!(
  owner_id: guest_user.id,
  title: "June Electricity",
  bill_type: "Electricity",
  amount: 87.42,
  from_date: Time.now - 1.years,
  end_date: Time.now
)

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
