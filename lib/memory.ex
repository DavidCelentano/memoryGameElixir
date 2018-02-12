defmodule Game do

  def new do
    %{
      tiles: ['!', '?', '?', '?'],
      moves: 0,
    }
  end

  def client_view(game) do
    %{
      tiles: ['*', '?', '?', '?'],
      moves: 0,
    }
  end

  def guess(game, tile) do
    if tile == 0 do
      raise "heyyyyyy"
    else
      raise "hoooooo"
    end
  end
end
