import React, { Component } from 'react'
import './Deck.scss';





class Deck extends Component {
  render() {
    return (
        <div className="cards deck">
            {
                this.props.cards.length > 0 && this.props.cards.map((element, index) => {
                    return (
                        this.props.cards.length - 1 === index ? <div key={index} className={this.props.trumpCard.classNameRang + " " + this.props.trumpCard.suit} style={{ zIndex: -1, left: -60 }}></div> : <div key={index} className="backShirt" style={{ zIndex: index }}></div>
                    )
                })
            }
            {this.props.cards.length > 0 && <div className="count-of-deck">В колоде:{this.props.cards.length}</div>}
            {this.props.cards.length > 0 && <div className="info-of-whose-turn">{this.props.messageWhoseTurn}</div>}
        </div>
    )
  }
}
export default  Deck;