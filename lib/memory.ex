defmodule Game do

  def new do
# use Enum.shuffle(board)
    %{
      board: ['a', 'a', 'b', 'b'],
      tiles: ['?', '?', '?', '?'],
      moves: 0,
      matches: [],
      currentGuess: 'z',
    }
  end

  def client_view(game) do
    %{
      tiles: game.tiles,
      moves: game.moves,
    }
  end

  def guess(game, tile) do
    moves = game.moves
    moves = moves + 1

    if game.currentGuess == 'z' do
      tiles = game.tiles
      tiles = List.replace_at(tiles, tile, Enum.at(game.board, tile))
      Map.put(game, :moves, moves) 
      |> Map.put(:tiles, tiles) 
      |> Map.put(:currentGuess, Enum.at(game.board, tile))
    else
      if game.currentGuess == Enum.at(board, tile) do
        matches = game.matches
        matches = matches + [game.currentGuess]
        newBoard = Enum.map(game.board, fn(x) -> 
          if Enum.member?(matches, x) do
            x
          else
            '?'
          end end)
      else
        # not a match
      end
    end
    
  end

end
