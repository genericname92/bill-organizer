class AddDatesToRoommates < ActiveRecord::Migration
  def change
    add_column :roommates, :from_date, :date, null: false
    add_column :roommates, :end_date, :date, null: false
  end
end
