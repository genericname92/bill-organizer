class BillsController < ApplicationController
  def create
    @bill = current_user.bills.new(bill_params)
    if @bill.save
      redirect_to ""
    else
      render json: @bill.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @bill = current_user.bills.find(params[:id])
    @bill.try(:destroy)
    render json: {}
  end

  def index
    @bills = current_user.bills
    render json: @bills
  end

  def show
    @bill = Bill.find(params[:id])
    render :show
  end
end
