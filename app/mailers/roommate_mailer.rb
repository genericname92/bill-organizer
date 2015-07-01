class RoommateMailer < ActionMailer::Base
  default from: "NOREPLY@billOrganizer.com"
  def invoice(roommate, bill, amount, current_user)
    @roommate = roommate
    @bill = bill
    @user = current_user
    @amount = amount
    if (@amount > 0)
      mail to: roommate.email,
        subject: (current_user.email + " has sent you an invoice!")
    end
  end
end
