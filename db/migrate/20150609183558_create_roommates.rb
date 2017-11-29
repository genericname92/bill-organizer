class CreateRoommates < ActiveRecord::Migration[4.2]
  def change
    create_table :roommates do |t|
      t.integer :bill_id, null: false
      t.string :email, null: false
      t.boolean :paid, default: false
      t.timestamps null: false
    end
  end
end
