defmodule Game do

  def new do
    %{
      tiles: ['?', '?', '?', '?'],
      moves: 0,
    }
  end

  def client_view(game) do
    %{
      tiles: ['?', '?', '?', '?'],
      moves: 0,
    }
  end
end
