import React, { Component } from 'react'
import './Nav.scss';

 class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <button className="new-game" onClick={this.props.onNewGame}>{"Новая игра"}</button>
            </nav>
        )
    }
}
export default Nav;


