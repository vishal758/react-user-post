import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            {console.log("side drawer:", props.loggedUser)}
            <Backdrop show = {props.open} clicked = {props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                         loggedInUser = {props.loggedUser}
                         isAuthenticated = {props.isAuth} />
                </nav>
            </div>

        </Aux>
    )
}

export default SideDrawer