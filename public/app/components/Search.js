import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: ''
    }
  }

  handleOnChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }

  goToList(country) {
    this.props.history.push(`/list/${country}`);
    this.setState({
      search: ''
    })
  }

  render() {
    var { search } = this.state;
    var { sendSearchValue } = this.props;

    return (
      <div>
        <input 
          type="text"
          name="search"
          value={search}
          onChange = {e => this.handleOnChange(e)} />

        <div onClick={() => this.goToList(search)}>
          {search}
        </div>
      </div>
    )
  }
}

module.exports = withRouter(Search);