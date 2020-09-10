import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'
class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return ({showSideDrawer: !prevState.showSideDrawer})
        })
    }

    render() {
        const logUser = this.props.loggedInUser
        return (
            <Aux>
                <Toolbar 
                    isAuth = {this.props.isAuthenticated}
                    loggedUser = {logUser}
                    open = {this.state.showSideDrawer} drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    loggedUser = {logUser}
                    isAuth = {this.props.isAuthenticated}
                    open = {this.state.showSideDrawer}
                    closed = {this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loggedInUser: state.auth.username
    }
}

export default connect(mapStateToProps)(Layout)