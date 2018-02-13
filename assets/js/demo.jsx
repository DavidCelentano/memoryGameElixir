import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(channel, root) {
  ReactDOM.render(<Demo channel={channel} />, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel
    this.state = { tiles: [], moves: 0 }

    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp) });
  }

  gotView(view) {
    console.log("New view", view);
    this.setState(view.game);
  }

  sendGuess() { //TODO will take letter
    this.channel.push("guess", { tile: 0 })
        .receive("ok", this.gotView.bind(this));
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <Button onClick={() => this.sendGuess()}>{this.state.moves}</Button>
        </div>
        <div className="col">
          <Button onClick={() => this.sendGuess()}>{String.fromCharCode(this.state.tiles[0])}</Button>
        </div>
      </div>
    )
  }
}
/*  
  makeGuess(value, index) {
    var moves = 1 + this.state.moves;
    this.setState({moves: moves});
    if (this.state.guess == '1') {
      this.setState({guess: value});
      var newGuessIndex = this.state.guessIndex;
      newGuessIndex.push(index);
      this.setState({guessIndex: newGuessIndex});
    }
    else {
      if (this.state.guess == value) {
        var nMatches = this.state.matches;
        nMatches.push(value);
        this.setState({matches: nMatches});
        this.setState({guess: '1'});//reset guess
        this.setState({guessIndex: []});
      }
      else {
        this.setState({guess: '1'});//reset guess
       // this.setState({guessIndex: []});
        var newGuessIndex = this.state.guessIndex;
        newGuessIndex.push(index);
        this.setState({guessIndex: newGuessIndex});
        this.setState({paused: true});
        var millisecondsToWait = 1000;
        var resetGuesses = (function() {
          this.setState({guessIndex: []});
          this.setState({paused: false}); }).bind(this);
        setTimeout(function() {
          resetGuesses()
        }, millisecondsToWait);
      }
    }
  }

// The shuffleArray function was created by "Grgur" on Stack Overflow
// Credit - https://stackoverflow.com/questions/38101522/how-to-render-random-objects-from-an-array-in-react
shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

  resetGame() {
    var newTiles = this.shuffleArray(this.state.tiles);
    this.setState({tiles: newTiles});
    this.setState({guessIndex: []});
    this.setState({matches: []});
    this.setState({guess: '1'});
    this.setState({paused: false});
    this.setState({moves: 0});
  }

  render() {
    var makeGuess = this.makeGuess.bind(this);
    var resetGame = this.resetGame.bind(this);
    return (
      <div className="row">
        <Button onClick={() => resetGame()}>Moves: {this.state.moves}<br/>Press to Reset</Button>
        <div className="col">
	  <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[0]} index={0} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[1]} index={1} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[1]} index={1} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[2]} index={2} guessIndex={this.state.guessIndex} />
           <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[3]} index={3} guessIndex={this.state.guessIndex} />
        </div>
        <div className="col">
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[4]} index={4} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[5]} index={5} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[6]} index={6} guessIndex={this.state.guessIndex} />
           <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[7]} index={7} guessIndex={this.state.guessIndex} />
        </div>
        <div className="col">
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[8]} index={8} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[9]} index={9} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[10]} index={10} guessIndex={this.state.guessIndex} />
           <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[11]} index={11} guessIndex={this.state.guessIndex} />
        </div>
        <div className="col">
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[12]} index={12} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[13]} index={13} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[14]} index={14} guessIndex={this.state.guessIndex} />
           <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[15]} index={15} guessIndex={this.state.guessIndex} />
        </div>
      </div>
    );
  }
}

function Side(params) {
  if (params.matches.includes(params.value)) {
    return (
      <div id="side-0" className="side col">
        <Button>{params.value}</Button>
      </div>
    );
  }
  if (params.guessIndex.includes(params.index)) {
     return (
      <div id="side-0" className="side col">
        <Button>{params.value}</Button>
      </div>
    );
  }
  if (params.paused) {
    return (
      <div id="side-0" className="side col">
        <Button>?</Button>
      </div>
    );
  }
  else {
    return (
      <div id="side-0" className="side col">
	<Button onClick={() => params.makeGuess(params.value, params.index)}>?</Button>
      </div>
    );
  }
}
*/

