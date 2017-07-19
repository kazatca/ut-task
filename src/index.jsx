import React from 'react';
import {render} from 'react-dom';

import App from './components/App.jsx';

fetch('/component-relationships.json')
.then(resp => resp.text())
.then(json => 
  render(
    <App json={json} />, 
    document.getElementById('app')
  )
);