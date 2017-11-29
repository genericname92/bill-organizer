class ChangeBillType < ActiveRecord::Migration[4.2]
  def change
    rename_column :bills, :type, :bill_type
  end
end
