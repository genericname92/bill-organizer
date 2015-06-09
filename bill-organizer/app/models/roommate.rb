# == Schema Information
#
# Table name: roommates
#
#  id         :integer          not null, primary key
#  bill_id    :integer          not null
#  email      :string           not null
#  paid       :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Roommate < ActiveRecord::Base
  belongs_to :bill
end
