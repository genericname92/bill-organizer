User.all.destroy_all
Bill.all.destroy_all
Follow.all.destroy_all
Roommate.all.destroy_all

guest_user = User.create!(email: "guest", password: "password")
a = User.create!(email: "billClinton@example.com", password: "password")
b = User.create!(email: "billCosby@example.com", password: "password")
c = other_user = User.create!(email: "billGates@example.com", password: "password")
user_list = [a, b, c, guest_user]

random_users = Array.new
25.times do
  random_users << User.create!(email: Forgery('internet').email_address, password: "password")
end
BILL_TYPES = ["Gas", "Electricity", "Water", "Internet", "Utilities", "Rent"]
(1..8).each do |num|
  BILL_TYPES.each do |type|
      #make a random bill
      ele = Bill.create!(
      owner_id: user_list.sample.id,
      bill_type: type,
      title: Date::MONTHNAMES[num] + " " + type,
      amount: rand() * 170,
      from_date: Time.new(2015, num, 1),
      end_date: Time.new(2015, num + 1, 1)
      )
      #create 4 roommates for each bill,
      # each bill has 1 full duration person,
      # 1 start before end before,
      # 1 start after end after,
      # 1 start after end before
      #also add guest as a roommate on some amount of the bills
      tracked_person = user_list.sample
      ele.roommates.create!(email: tracked_person.email, from_date: ele.from_date, end_date: ele.end_date)
      Follow.create!(bill_id: ele.id, user_id: tracked_person.id)
      roommate = ele.roommates.create!(
        email: random_users.sample,
        from_date: ele.from_date,
        end_date: ele.end_date - (rand() *28).days
      )
      Follow.create!(bill_id: ele.id, user_id: tracked_person.id)
      roommate = random_users.sample
      ele.roommates.create!(
        email: roommate.email,
        from_date: ele.from_date + (rand() * 28).days,
        end_date: ele.end_date
      )
      Follow.create!(bill_id: ele.id, user_id: roommate.id)

      start_date = ele.from_date + (rand() * 28).days
      roommate = random_users.sample
      ele.roommates.create!(
        email: roommate,
        from_date: start_date,
        end_date: start_date + 5.days
      )
      Follow.create!(bill_id: ele.id, user_id: roommate.id)

      if d != guest_user && rand() > 0.3
        ele.roommates.create!(
          email: guest_user.email, from_date: ele.from_date, end_date: ele.end_date
        )
        Follow.create!(bill_id: ele.id, user_id: guest_user.id)

      end


    end
  end
# end
# ele = Bill.create!(
#   owner_id: guest_user.id,
#   title: "June Electricity",
#   bill_type: "Electricity",
#   amount: 87.42,
#   from_date: Time.new(2015, 6, 1),
#   end_date: Time.new(2015, 7, 1)
# )
# ele2 = Bill.create!(
#   owner_id: guest_user.id,
#   title: "June Water",
#   bill_type: "Water",
#   amount: 115.42,
#   from_date: Time.new(2015, 6, 1),
#   end_date: Time.new(2015, 7, 1)
# )
#
# ele3 = Bill.create!(
#   owner_id: guest_user.id,
#   title: "June Sewage",
#   bill_type: "Sewage",
#   amount: 45.42,
#   from_date: Time.new(2015, 6, 1),
#   end_date: Time.new(2015, 7, 1)
# )
#
# other_bill = Bill.create!(owner_id: other_user.id, title: "July Internet", bill_type: "Internet",
#   amount: 75, from_date: Time.new(2015, 7, 1), end_date: Time.new(2015, 8, 1))
#
# Roommate.create!(
#   bill_id: ele.id,
#   email: "billCosby@example.com",
#   from_date: Time.new(2015, 3, 1),
#   end_date: Time.new(2015, 7, 17)
# )
# Roommate.create!(
#   bill_id: ele.id,
#   email: "billClinton@example.com",
#   from_date: Time.new(2015, 5, 1),
#   end_date: Time.new(2015, 6, 19)
# )
# Roommate.create!(
#   bill_id: ele.id,
#   email: "billGates@example.com",
#   from_date: Time.new(2015, 6, 12),
#   end_date: Time.new(2015, 7, 1)
# )
#
# Roommate.create!(
#   bill_id: other_bill.id,
#   email: "guest",
#   from_date: Time.new(2015, 6, 1),
# end_date: Time.new(2015, 9, 1)
# )
#
# Follow.create!(
#   bill_id: other_bill.id,
#   user_id: guest_user.id
# )
