class AddsUniqueIdToShowPages < ActiveRecord::Migration
  def change
    add_column :bills, :show_string, :string
  end
end
