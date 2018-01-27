import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo moves={0} />, root);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moves: 0, tiles:['a', 'b', 'a', 'b', 'c', 'd', 'c', 'd', 'e', 'f', 'e', 'f', 'g', 'h', 'g', 'h']}; //TODO RANDOM
  }

  increment(moves) {
    var moves = 1 + this.state.moves;
    this.setState({moves: moves});
  }

  render() {
    var increment = this.increment.bind(this);
    return (
      <div className="row">
        <div className="col">
	  <Side show={this.state.moves == 0} increment={increment} value={this.state.tiles[0]} />
	  <Side show={this.state.moves == 0} increment={increment} value={this.state.tiles[1]} />
	  <Side show={this.state.moves == 0} increment={increment} value={this.state.tiles[2]} />
	  <Side show={this.state.moves == 0} increment={increment} value={this.state.tiles[3]} />
        </div>
      </div>
    );
  }
}

function Side(params) {
  if (params.show) {
    return (
      <div id="side-0" className="side col" onClick={() => params.increment()} >
        <Button>{params.value}</Button>
      </div>
    );
  }
  else {
    return (
      <div id="side-0" className="side col">
	<p>{params.moves}</p>
      </div>
    );
  }
}

