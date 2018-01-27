import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo moves={0} />, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moves: 0, tiles:['a', 'b', 'a', 'b', 'c', 'd', 'c', 'd', 'e', 'f', 'e', 'f', 'g', 'h', 'g', 'h'], matches: [], guess: 'a'}; //TODO RANDOM
  }

  increment(moves) {
    var moves = 1 + this.state.moves;
    this.setState({moves: moves});
  }
  
  guess() {
   // console.log("guess made");
    var value = 'a'
    if (this.state.guess == '1') {
      this.setState({guess: value});
    }
    else {
      if (this.state.guess == value) {
     //   console.log(value);
        var nMatches = this.state.matches;
        nMatches.push(value);
        this.setState({matches: nMatches});
      }
    }
  }

  render() {
    var guess = this.guess.bind(this);
   // console.log(this.state.matches);
    return (
      <div className="row">
        <div className="col">
	  <Side state={this.state} matches={this.state.matches} guess={guess} value={this.state.tiles[0]} />
        </div>
      </div>
    );
  }
}

function Side(params) {
  if (params.matches.includes(params.value)) {
    console.log("showing letter");
    return (
      <div id="side-0" className="side col">
        <Button>{params.value}</Button>
      </div>
    );
  }
  else {
    console.log("showing ?");
    return (
      <div id="side-0" className="side col">
	<Button onClick={() => params.guess()}>?</Button>
      </div>
    );
  }
}

