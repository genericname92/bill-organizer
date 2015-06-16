class CreateBills < ActiveRecord::Migration
  def change
    create_table :bills do |t|
      t.integer :owner_id
      t.string :title, null: false
      t.string :type
      t.decimal :amount, precision: 8, scale: 2
      t.date :from_date, null: false
      t.date :end_date, null: false
      t.timestamps null: false
    end
  end
end
