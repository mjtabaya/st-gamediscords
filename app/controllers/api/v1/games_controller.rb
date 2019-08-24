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
      @game = Game.new(game_params)
      if @game.save
        #render json: @games, status: :created, location: @games
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
        params.require(:game).permit(:name, :description, :servers)
      end
  end
end
