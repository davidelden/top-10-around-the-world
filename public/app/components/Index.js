import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'

const Search = require('./Search');
const GetList = require('./GetList');

class Index extends Component {
  render() {
    return (
      <div>
        <h1>Top 10 Around The World</h1>
        <Search />
        <Route path="/list/:country" component={GetList} />
      </div>
    )
  }
}

module.exports = Index;