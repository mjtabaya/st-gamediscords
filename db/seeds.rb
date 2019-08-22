10.times do
  Game.create do |g|
    g.name = Faker::Game.title
    g.description = Faker::Game.genre
    g.servers = Faker::Address.country_code
    g.platform = Faker::Game.platform
    rand(1..3).times do
      g.discords.new do |discord|
        discord.name = g.name + Faker::Team.creature
        discord.link = 'discord.gg/' + Faker::Lorem.word
        discord.population = rand(30..4000)
      end
    end
  end
end
