import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class GetList extends Component {
  constructor() {
    super();

    this.state = {
      listData: {}
    }
  }

  componentDidMount() {
    this.loadList();
  }

  loadList() {
    fetch(`/api/v1/lists/${this.props.match.params.country}`)
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
    if(Object.keys(this.state.listData).length < 1) { return null };
    let { tracks } = this.state.listData;
    return (
      <div>
        <h3>{tracks["@attr"].country}</h3>
        {tracks.track.map((trk, i) => {
          return (
            <div key={i}>
              <p>{i+1} {trk.name}</p>
            </div>
          )
        })
      }
      </div>
    )
  }
}

module.exports = GetList;