import React from 'react';
import PropTypes from 'prop-types';
import Graph from 'react-graph-vis';
import groups from './Graph.groups.js';

//select the most suitable group
const selectGroup = (groups, type) => {
  type = type.split('/');
  while(type.length >= 1){
    const commonType = type.join('/');
    if(commonType in groups){
      return commonType;
    }
    type.pop();
  }
  return 'default';
};

//get map of nodes (nodes[name] = {name, type})
const getNodes = json => 
  json.reduce((result, {component}) => ({
    ...result,
    [component.name]: component
  }), {});

//get list of edges
const getEdges = json => {
  //collect edges to map (edges[parent][child] = true)
  //do it for avoid duplicates
  const edges = json.reduce((result, {component, consumers, dependencies}) => {
    const child = component.name;
    consumers.forEach(({component}) => {
      const parent = component.name;
      result[parent] = result[parent] || {};
      result[parent][child] = true;
    });

    const parent = component.name;
    result[parent] = result[parent] || {};    
    dependencies.forEach(({component}) => {
      const child = component.name;
      result[parent][child] = true;
    });

    return result;
  }, {});

  //make list of edges ([{from, to}, ...])
  return Object.keys(edges).reduce((result, parent) => 
    result.concat(Object.keys(edges[parent]).map(child => ({
      from: parent, 
      to: child
    }))), 
    []);
};

const ComponentsGraph = ({json, onClick, ...props}) => {
  try{
    json = JSON.parse(json);
    json = json.componentRelationships;
    if(!json){
      throw 'componentRelationships undefined';
    }
  }
  catch(e){
    return <p>Invalid JSON</p>;
  }

  const nodes = getNodes(json);
  const edges = getEdges(json);
  const graph = {
    nodes: Object.values(nodes).map(({name, type}) => ({
      id: name,
      label: `<b>${name}</b>\n${type}`,
      font: { multi: 'html', size: 14 },
      group: selectGroup(groups, type)
    })),
    edges
  };
  
  const handleClick = event => {
    if(event.nodes.length == 1 && typeof onClick == 'function'){
      const {name, type} = nodes[event.nodes[0]];
      onClick(name, type);
    }
  };

  const options = {
    autoResize: true,
    edges: {
      color: "darkgray"
    },
    physics: {
      barnesHut: {
        gravitationalConstant: -40000,
        centralGravity: 0,
        damping: 0.1
      },
      minVelocity: 0.75,
      maxVelocity: 3
    },
    groups
  };
  //todo: pass deep props (like props.options.physics.minVelocity)

  return (<Graph
    style={{width: '100%', height: '720px'}} 
    {...props}
    graph={graph} 
    options={options} 
    events={{dragStart: handleClick, click: handleClick, select: handleClick}} 
  />);
};

ComponentsGraph.propTypes = {
  json: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default ComponentsGraph;
