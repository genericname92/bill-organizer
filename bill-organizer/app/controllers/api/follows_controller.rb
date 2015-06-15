module Api
  class FollowsController < ApplicationController
    def destroy
      @tag = Follow.find(params[:id])
      @tag.destroy
        render json: {}
    end

    def update
      @tag = Follow.find(params[:id])
      if @tag.update(follow_params)
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

      def follow_params
        params.require(:tag).permit(:viewed)
      end

  end
end
