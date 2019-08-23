10.times do
  Game.create do |g|
    g.name = Faker::Game.unique.title
    g.description = Faker::Game.unique.genre + ", " + Faker::Game.unique.genre
    g.servers = Faker::Address.country_code + ", " + Faker::Address.country_code + ", " + Faker::Address.country_code
    g.platform = Faker::Game.platform + ", " + Faker::Game.platform
    rand(1..3).times do
      g.discords.new do |discord|
        discord.name = Faker::Team.creature + " - " + g.name
        discord.link = 'discord.gg/' + Faker::Lorem.unique.word
        discord.population = rand(30..4000)
      end
    end
  end
end
