class AddsUniqueIdToShowPages < ActiveRecord::Migration[4.2]
  def change
    add_column :bills, :show_string, :string
  end
end
