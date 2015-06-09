User.all.destroy_all
guest_user = User.create!(email: "guest", password: "password")
Bill.create!(
  owner_id: guest_user.id,
  title: "June Electricity",
  bill_type: "Electricity",
  amount: 87.42,
  from_date: Time.now - 1.years,
  end_date: Time.now
)
