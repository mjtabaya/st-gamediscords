module Api::V1
  class DiscordsController < ApplicationController
    before_action :set_discord, only: [:show, :update, :destroy]

    # GET /discords
    def index
      puts "asdasdasdasdasdasdasd"
      @discords = Discord.all

      render json: @discords
    end

    # GET /discords/1
    def show
      render json: @discord
    end

    # POST /discords
    def create
      @discord = Discord.new(discord_params)

      if @discord.save
        render json: @discord, status: :created, location: @discord
      else
        render json: @discord.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /discords/1
    def update
      if @discord.update(discord_params)
        render json: @discord
      else
        render json: @discord.errors, status: :unprocessable_entity
      end
    end

    # DELETE /discords/1
    def destroy
      @discord.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_discord
        @discord = Discord.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def discord_params
        params.require(:discord).permit(:name, :link, :population, :game_id)
      end
  end
end
