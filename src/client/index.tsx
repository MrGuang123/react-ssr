import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { createClientStore } from '../shared/store';
import App from '../shared/App'
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={createClientStore()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)