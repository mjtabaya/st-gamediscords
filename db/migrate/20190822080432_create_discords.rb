class CreateDiscords < ActiveRecord::Migration[5.2]
  def change
    create_table :discords do |t|
      t.string :name
      t.string :link
      t.integer :population
      t.references :game, foreign_key: true

      t.timestamps
    end
  end
end
