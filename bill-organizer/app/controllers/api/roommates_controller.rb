module Api
  class RoommatesController < ApplicationController
    def create
      @roommate = Roommate.new(roommate_params.merge!(bill_id: params[:bill][:id]))
      if @roommate.save
        tagged = User.find_by(email: @roommate.email)
        if (tagged)
          Follow.create!(user_id: tagged.id, bill_id: @roommate.bill.id);
        end
        render json: @roommate, status: 200
      else
        render json: @roommate.errors.full_messages, status: :unprocessable_entity
      end
    end

    def update
      @roommate = Roommate.find(params[:id])
      if @roommate.update(roommate_params)
        render json: @roommate
      else
        render json: @roommate.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @roommate = Roommate.find(params[:id])
      @roommate.try(:destroy)
      render json: {}
    end
    private
    def roommate_params
      params.require(:roommate).permit(:email, :paid, :from_date, :end_date)
    end
  end
end
