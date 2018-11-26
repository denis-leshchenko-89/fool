import React, { Component } from 'react'
import './Computer.scss';

class Computer extends Component {
    render() {
        return (
            <div className="cards computer">
                {
                    this.props.computer.length > 0 && this.props.computer.map((element, index) => {
                        return (

                            <div key={index} className="backShirt" style={{ zIndex: index, left: 20 * index }} ></div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Computer;