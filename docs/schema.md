# Schema Information

## bills
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
type        | string    |
amount      | float     | not null
From        | date      | not null
End         | date      | not null

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
blog_id     | integer   | not null, foreign key (references bills)
follower_id | integer   | not null, foreign key (references users)

## roommates
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
bill_id     | integer   | not null, foreign key (references bills)
email       | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
