class CreatesUserTags < ActiveRecord::Migration[4.2]
  def change
    create_table :follows do |t|
      t.integer :bill_id, null: false
      t.integer :user_id, null: false
      t.boolean :viewed, default: false
      t.timestamps null: false
    end
    add_index :follows, :bill_id
    add_index :follows, :user_id

  end
end
