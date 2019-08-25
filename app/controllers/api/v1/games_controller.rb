module Api::V1
  class GamesController < ApplicationController
    before_action :set_game, only: [:show, :update, :destroy]

    # GET /games
    def index
      @games = Game.all
      render json: @games.as_json(
         include: {
            discords: {}
         }
      )
    end

    # GET /games/1
    def show
      @game = Game.find(params[:id])
      render json: @game.as_json(
         include: {
            discords: {}
         }
      )
    end

    # POST /games
    def create
      pp "pp params"
      pp params
      pp "pp game_params"
      pp game_params
      @game = Game.new(game_params)
      if @game.save
        @discords = params[:discords]
        @game_id = @game.id
        @game = Game.find(@game.id)
        @discords.each_with_index do |discord, index|
          @game.discords.create(discord.permit(Discord.column_names))
        end
        @games = Game.all
        render json: @games.as_json(
           include: {
              discords: {}
           }
        )
      else
        render json: @game.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /games/1
    def update
      @game = Game.find(params[:id])
      @discords = params[:discords]
      pp "pp on params"
      pp params
      pp "pp on game params"
      pp game_params
      pp "pp on params[:discords]"
      pp params[:discords]
      pp "pp on @discords"
      pp @discords
      pp "pp on game_params[:discords]"
      pp game_params[:discords]
      pp "fwoosh"
      @discords.each_with_index do |discord, index|
        @discord = Discord.find(discord[:id])
        if @discord
          @discord.update(discord.permit(Discord.column_names))
        end
      end
      @new_discords = params[:new_discords]
      @new_discords.each do |discord|
        @game.discords.create(discord.permit(Discord.column_names))
      end
      if @game.update(game_params)
        @games = Game.all
        render json: @games.as_json(
           include: {
              discords: {}
           }
        )
      else
        render json: @game.errors, status: :unprocessable_entity
      end
    end

    # DELETE /games/1
    def destroy
      @game.destroy
      @games = Game.all
      render json: @games.as_json(
         include: {
            discords: {}
         }
      )
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_game
        @game = Game.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def game_params
        params.require(:game)
        .permit(:id, :name,
          :description, :servers, :platform,
          [:discords => [:id, :name, :link, :population, :game_id, :created_at, :updated_at]]
        )
      end
  end
end
