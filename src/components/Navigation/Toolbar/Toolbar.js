import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import { Route, Link } from 'react-router-dom'
import Posts from '../../../containers/Posts/Posts'
import NewPost from '../../../containers/NewPost/NewPost'

const Toolbar = props => {
    return (
        <Aux>
            <header className={classes.Toolbar}>
                <DrawerToggle clicked = {props.drawerToggleClicked} />
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems />
                </nav>
            </header>
            <Route path="/" exact component={Posts} />
            <Route path="/new-post" component = {NewPost}/>
        </Aux>


    )
}

export default Toolbar