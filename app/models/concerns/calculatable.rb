module Calculatable
  extend ActiveSupport::Concern

  included do
    has_many :roommates
  end

  def total_relevant_days
    total_days = 0
    self.roommates.each do |roommate|
      total_days += relevant_days(roommate)
    end
    total_days
  end

  def relevant_days(roommate)
    if roommate.from_date > self.from_date
      relevantStartDate = roommate.from_date
    else
      relevantStartDate = self.from_date
    end

    if roommate.end_date > self.end_date
      relevantEndDate = self.end_date
    else
      relevantEndDate = roommate.end_date
    end

    relevantEndDate - relevantStartDate
  end

  def owed_amount(roommate)
    (100 * self.amount * relevant_days(roommate) / total_relevant_days).round / 100.0
  end
end
