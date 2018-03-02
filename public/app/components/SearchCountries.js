import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import Fuse from 'fuse.js'

class SearchCountries extends Component {
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

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchResults != this.state.searchResults && this.state.searchResults.length > 0) {
      let results = this.getSearchResultsArray();
      let activeIndex = this.getActiveResultIndex(results);
      // Remove exisiting active class (if exists)
      if(activeIndex >= 0) {
        this.removeActiveClass(results, activeIndex);
      }
      // Add active class to first search result
      results[0].classList.add('active');
    }
  }

  searchOnChange(event) {
    const value = event.target.value;

    this.setState({
      searchResults: this.searchResults(value)
    });
  }

  searchOnKeyDown(event) {
    if(this.state.searchResults.length > 0) {
      let results = this.getSearchResultsArray();
      var activeIndex = this.getActiveResultIndex(results);
      var country = results[activeIndex].innerText;

      switch(event.key) {

        case 'Tab':
        case 'ArrowDown':
          event.preventDefault();
          if(activeIndex+1 < results.length && !event.shiftKey) {
            // Remove active from active class
            this.removeActiveClass(results, activeIndex);
            // Make next element active
            results[activeIndex+1].classList.add('active');
            country = results[activeIndex+1].innerText;
            activeIndex++;
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          if(activeIndex > 0 ) {
            this.goToPrevSearchResult(results, activeIndex, country);
          }
          break;

        case 'Enter':
          this.goToList(country);
          break;

        case 'Escape':
          this.clearSearchResults();
          this.clearSearchInput();
          break;

        default:
          break;
      }

      // Listen for Shift+Tab (can not detect as switch case)
      if(event.key == 'Tab' && event.shiftKey) {
        event.preventDefault();
        if(activeIndex > 0) {
          this.goToPrevSearchResult(results, activeIndex, country);
        }
      }

    }
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

  getActiveResultIndex(resultsArr) {
    return resultsArr.findIndex(elem => elem.classList.value == "search-result active");
  }

  getSearchResultsArray() {
    let results = document.getElementsByClassName('search-result');
    return Array.from(results);
  }

  removeActiveClass(resultsArr, activeIndex) {
    resultsArr[activeIndex].classList.remove('active');
  }

  goToPrevSearchResult(results, activeIndex, country) {
    // Remove active from active class
    this.removeActiveClass(results, activeIndex);
    // Make prev element active
    results[activeIndex-1].classList.add('active');
    country = results[activeIndex-1].innerText;
    activeIndex--;
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
          onChange={e => this.searchOnChange(e)}
          onKeyDown={e => this.searchOnKeyDown(e)} />

        {searchResults.length > 0 ?
          searchResults.map((country, i) => {
            if(i < 5) {
              return(
                <div
                  key={i}
                  className="search-result"
                  onClick={() => this.goToList(country)}>{country}</div>
              )
            }
          })
        : null}
      </div>
    )
  }
}

module.exports = withRouter(SearchCountries);