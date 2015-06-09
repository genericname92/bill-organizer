class CreateRoommates < ActiveRecord::Migration
  def change
    create_table :roommates do |t|
      t.integer :bill_id, null: false
      t.string :email_address, null: false
      t.boolean :paid, default: false
      t.timestamps null: false
    end
  end
end
