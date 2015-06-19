class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :body
      t.integer :owner_id
      t.integer :bill_id

      t.timestamps null: false
    end
  end
end
