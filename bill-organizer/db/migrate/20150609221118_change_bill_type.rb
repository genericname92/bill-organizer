class ChangeBillType < ActiveRecord::Migration
  def change
    rename_column :bills, :type, :bill_type
  end
end
