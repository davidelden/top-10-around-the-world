import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class ListErr extends Component {
  errMessage() {
    switch(this.props.errCode) {
      case 6:
        return 'Country name is invalid. Please search again.';
        break;
      default:
        return `An error occurred. Error code: ${this.props.errCode}`;
        break;
    }
  }

  render() {
    return (
      <div>
        <p>{this.errMessage()}</p>
      </div>
    )
  }
}

ListErr.propTypes = {
  errCode: PropTypes.number
}

module.exports = ListErr;