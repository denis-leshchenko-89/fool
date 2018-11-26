import React, { Component } from 'react'
import './Message.scss';

class Message extends Component {
  render() {
    return (
        <div className="message">
          <h2>{this.props.message}</h2>
      </div>
    )
  }
}

export default  Message;