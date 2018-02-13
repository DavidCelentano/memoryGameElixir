defmodule Game do

  def new do
    %{
      board: ['a', 'a', 'b', 'b'],
      moves: 0,
      matches: [],
      currentGuess: -1,
    }
  end

  def client_view(game) do
    %{
      tiles: ['?', '?', '?', '?'],
      moves: game.moves,
    }
  end

  def guess(game, tile) do
    moves = game.moves
    moves = moves + 1
    IO.puts moves
    Map.put(game, :moves, moves)
    #game 
  end

end
