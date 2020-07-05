import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/newPost" > New Post </NavigationItem>
            <NavigationItem link="/allPosts" > AllPosts </NavigationItem>
            <NavigationItem link="/users"> Users </NavigationItem>
        </ul>
    )
}

export default NavigationItems