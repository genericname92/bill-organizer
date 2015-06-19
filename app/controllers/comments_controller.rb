module Api
  class CommentsController < ApplicationController
    def create
      @comment = Comment.new(comment_params.merge!(bill_id: params[:bill][:id]))
      @comment.owner_id = current_user.id
      if @comment.save
        render json: @comment, status: 200
      else
        render json: @comment.errors.full_messages, status: unprocessable_entity
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.try(:destroy)
      render json: {}
    end
    private
    def roommate_params
      params.require(:comment).permit(:body)
    end

  end
end
