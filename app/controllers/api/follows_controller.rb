module Api
  class FollowsController < ApplicationController
    def destroy
      @follow = Follow.find(params[:id])
      @follow.destroy
        render json: {}
    end

    def update
      @follow = Follow.find(params[:id])
      if @follow.update(follow_params)
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

      def follow_params
        params.require(:follow).permit(:viewed)
      end

  end
end
