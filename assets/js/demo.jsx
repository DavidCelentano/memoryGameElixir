import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo moves={0} />, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moves: 0, tiles:['a', 'c', 'a', 'b', 'e', 'h', 'c', 'd', 'b', 'f', 'e', 'f', 'a', 'd', 'g', 'h'], matches: [], guess: '1', guessIndex: [], paused: false}; //TODO RANDOM
  }

  increment(moves) {
    var moves = 1 + this.state.moves;
    this.setState({moves: moves});
  }
  
  makeGuess(value, index) {
    console.log(index);
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


  resetGame() {
    this.setState({guessIndex: []});
    this.setState({matches: []});
    //TODO randomize new tile values
    this.setState({guess: '1'});
    this.setState({paused: false});
  }

  render() {
    var makeGuess = this.makeGuess.bind(this);
    var resetGame = this.resetGame.bind(this);
    return (
      <div className="row">
        <Button onClick={() => resetGame()}>Reset</Button>
        <div className="col">
	  <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[0]} index={0} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[1]} index={1} guessIndex={this.state.guessIndex} />
          <Side state={this.state} paused={this.state.paused} matches={this.state.matches} makeGuess={makeGuess} value={this.state.tiles[2]} index={2} guessIndex={this.state.guessIndex} />
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

