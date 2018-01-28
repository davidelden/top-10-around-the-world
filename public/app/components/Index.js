import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router-dom'

const GetList = require('./GetList');

class Index extends Component {
  render() {
    console.log(process.env);
    return (
      <div>
        <h1>Top 10 Around The World</h1>
        <Route path="/list/:country" component={GetList} />
      </div>
    )
  }
}

module.exports = Index;