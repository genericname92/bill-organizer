class StartIDat1000 < ActiveRecord::Migration[4.2]
  def change
    execute("ALTER SEQUENCE bills_id_seq START with 1000 RESTART;")
  end
end
