// React code starts here
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Index = require('./components/Index');

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Index} />
      </div>
    )
  }
}

ReactDOM.render(
  (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('app')
);