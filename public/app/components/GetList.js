import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const DisplayList = require('./DisplayList');
const ListNoTrackData = require('./ListNoTrackData');
const ListErr = require('./ListErr');

class GetList extends Component {
  constructor() {
    super();

    this.state = {
      listData: {}
    }
  }

  componentDidMount() {
    this.loadList(this.props.match.params.country);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.match.params.country != this.props.match.params.country) {
      this.loadList(nextProps.match.params.country);
    }
  }

  loadList(country) {
    fetch(`/api/v1/lists/${country}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          listData: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    let country = this.props.match.params.country;
    let objKeys = Object.keys(this.state.listData);

    if(objKeys.length < 1) { return null };
    if(objKeys.includes('tracks')) {
      var { tracks } = this.state.listData;
    }
    if(objKeys.includes('error')) {
      var { error } = this.state.listData;
    }

    return (
      <div>
        <h3>{country}</h3>
        {tracks && tracks.track.length > 0 ?
          tracks.track.map((trk, i) => {
            return (
              <DisplayList
                key={i+1}
                trackName={trk.name}
                artistName={trk.artist.name}
                artistUrl={trk.artist.url}
                imageArr={trk.image}
                rank={i+1} />
              )
            })
        : null}
        {tracks && tracks.track.length == 0 ? <ListNoTrackData /> : null}
        {error ? <ListErr errCode={error} /> : null}
      </div>
    )
  }
}

module.exports = GetList;