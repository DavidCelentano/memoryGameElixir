defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def game(conn, params) do
    game_name = params["game_name"]
    render conn, "game.html", game_name: game_name
  end
end
