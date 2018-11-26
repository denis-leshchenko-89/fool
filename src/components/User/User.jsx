import React, { Component } from 'react'
import './User.scss';

class User extends Component {
    render() {
        return (
            <div className="cards user">
                {
                    this.props.user.length > 0 && this.props.user.map((element, index) => {
                        return (
                            <div key={index} className={element.classNameRang + " " + element.suit} style={{ zIndex: index, left: 20 * index }} onClick={() => this.props.onClickCard(index)}></div>
                        )
                    })
                }
                <button className="take-away"   onClick={this.props.onClickButton}>{this.props.whoseTurn === 1 ? "Отбой" : "Взять"}</button>
            </div>
        )
    }
}
export default User;