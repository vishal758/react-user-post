import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Aux from '../../../hoc/Aux/Aux'
const Toolbar = props => {
    return (
        <Aux>
            <header className={classes.Toolbar}>
                <DrawerToggle clicked = {props.drawerToggleClicked} />
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuthenticated = {props.isAuth} />
                </nav>
            </header>
        </Aux>


    )
}

export default Toolbar