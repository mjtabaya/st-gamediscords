class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name
      t.text :description
      t.string :servers
      t.string :platform

      t.timestamps
    end
  end
end
