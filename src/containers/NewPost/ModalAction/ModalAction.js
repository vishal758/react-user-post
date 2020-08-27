import React, { Component } from 'react'
import classes from './ModalAction.module.css'

class ModalAction extends Component {
    render() {
        return (
            <div className={classes.ModalAction}>
                <h3>{this.props.message}</h3>
                <span></span>
                <div className={classes.But}>
                    <button className={[classes.Button, classes.Danger].join(' ')} onClick={this.props.actionCancelled}>CANCEL</button>
                    <button className={[classes.Button, classes.Success].join(' ')} onClick={this.props.actionConfirmed}>{this.props.mess}</button>
                </div>
                
            </div>                
        )
    }
}

export default ModalAction