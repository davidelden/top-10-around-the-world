import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import Fuse from 'fuse.js'

class Search extends Component {
  constructor() {
    super();

    this.state = {
      countries: {},
      searchResults: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/countries')
      .then(res => res.json())
      .then(data => {
        this.setState({
          countries: data
        })
      })
      .catch(err => console.error(err));
  }

  searchOnChange(event) {
    const value = event.target.value;

    this.setState({
      searchResults: this.searchResults(value)
    });
  }

  goToList(country) {
    this.props.history.push(`/list/${country}`);
    this.clearSearchInput();
    this.clearSearchResults();
  }

  clearSearchInput() {
    document.getElementById('country-search').value = '';
  }

  clearSearchResults() {
    this.setState({
      searchResults: []
    })
  }

  searchResults(searchInput) {
    let fuseOptions = {
      keys: ['name'],
      id: 'name',
      threshold: 0.2
    };
    let fuse = new Fuse(this.state.countries, fuseOptions);
    return fuse.search(searchInput);
  }

  render() {
    var { countries, searchResults } = this.state;
    var { sendSearchValue } = this.props;
    return (
      <div>
        <input
          id="country-search"
          type="text"
          name="search"
          onChange = {e => this.searchOnChange(e)} />

        {searchResults.length > 0 ?
          searchResults.map((country, i) => {
            if(i < 5) {
              return(
                <div key={i} onClick={() => this.goToList(country)}>{country}</div>
              )
            }
          })
        : null}
      </div>
    )
  }
}

module.exports = withRouter(Search);