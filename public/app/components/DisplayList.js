import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class DisplayList extends Component {
  render() {
    let { trackName, artistName, artistUrl, imageArr, rank } = this.props;
    return (
      <div>
        <img src={imageArr[3]["#text"]} />
        <p>{rank} {trackName}</p>
        <p>{artistName}</p>
      </div>
    )
  }
}

DisplayList.propTypes = {
  trackName: PropTypes.string,
  artistName: PropTypes.string,
  artistUrl: PropTypes.string,
  imageArr: PropTypes.array,
  rank: PropTypes.number
}

module.exports = DisplayList;