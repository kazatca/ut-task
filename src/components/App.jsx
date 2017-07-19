import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Graph from './Graph.jsx';

class App extends Component{
  static propTypes = {
    json: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);
    this.state = {selected: {}};
  }

  selectNode(node){
    this.setState({selected: node});
  }

  render(){
    const {name, type} = this.state.selected;
    return (
      <div>
        <Graph 
          json={this.props.json}
          onClick={(name, type) => this.selectNode({name, type})}  
        />
        <hr/>
        <div>
          <p>Is used <a href="https://github.com/crubier/react-graph-vis">react-graph-vis</a>, 
            which in turn uses <a href="http://visjs.org">vis.js</a>.</p>
          <p>You can zoom, move whole graph or move single node.</p>
          <p>
            <div>Last clicked node</div>
            <div>
              <label>Name:</label>
              <span>{name}</span>
            </div>
            <div>
              <label>Type:</label>
              <span>{type}</span>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default App;