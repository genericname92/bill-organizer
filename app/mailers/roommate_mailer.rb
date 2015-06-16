class RoommateMailer < ApplicationMailer
  def invoice(roommate, bill)
    @roommate = roommate
    @bill = bill
    @user = current_user
    mail to: roommate.email,
      subject: (current_user.email + " has sent you an invoice!")
  end
end
