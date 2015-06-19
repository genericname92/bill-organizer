json.extract! @comment, :id, :bill_id, :owner_id, :created_at, :updated_at, :body
json.timeAgo time_ago_in_words(@comment.created_at)
json.user @comment.user.email
