import React, { Component } from 'react'
import './Game.scss';

 class Game extends Component {
  render() {
    return (
        <div className="cards game">
            {
                this.props.game.length > 0 && this.props.game.map((element, index) => {
                    return (

                        <div key={index} className={element.classNameRang + " " + element.suit} style={{ zIndex: index, left: 40 * index }}></div>
                    )
                })
            }
        </div>
    )
  }
}
export default Game;