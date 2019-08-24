class Game < ApplicationRecord
  has_many :discords, dependent: :destroy
end
