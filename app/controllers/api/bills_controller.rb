module Api
  class BillsController < ApplicationController
    before_action :require_signed_in!, except: :show

    def require_signed_in!
      unless signed_in?
        render json: ["You must be signed in to perform that action!"], status: :unauthorized
      end
    end

    def create
      @bill = current_user.bills.new(bill_params)
      if @bill.save
        render json: @bill, status: 200
      else
        render json: @bill.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @bill = Bill.find(params[:id])
      if @bill.update(bill_params)
        render json: @bill
      else
        render json: @bill.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @bill = current_user.bills.find(params[:id])
      @bill.destroy
      render json: {}
    end

    def index
      if params[:taggedBills]
        @bills = current_user.tagged_bills.reject { |bill| bill.owner_id == current_user.id }
        render json: @bills
      elsif params[:unseenTaggedBills]
        tag_bills = current_user.tagged_bills.includes(:follows).where("viewed=false")
        @bills = tag_bills.reject { |bill| bill.owner_id == current_user.id }
        notifications = current_user.taggings.where("viewed=false")
        user_bill_ids = current_user.bills.map { |bill| bill.id }
        @notifications = notifications.reject {|notification| user_bill_ids.include?(notification.bill_id) }
        render :notifications
      elsif params[:searchString]
        @bills = current_user.bills.where("title=#{params[:searchString]}")
        render json: @bills
      else
        @bills = current_user.bills
        render json: @bills
      end
    end

    def show
      @bill = Bill.find(params[:id])
      @comments = @bill.comments.includes(:user)
      render :show
    end

    def mail_to_people
      @bill = Bill.find(params[:bill_id])
      mailer = RoommateMailer
      @bill.roommates.each do |roommate|
        if !roommate.paid
          amount = @bill.owed_amount(roommate)
          mailer.invoice( roommate, @bill, amount, current_user).deliver_now
        end
      end
      render json: {}
    end

    private
    def bill_params
      params.require(:bill).permit(:title, :bill_type, :amount, :from_date, :end_date)
    end
  end
end
