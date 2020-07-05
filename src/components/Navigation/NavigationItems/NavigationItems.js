import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active> UserPost </NavigationItem>
            <NavigationItem link="/"> AllPosts </NavigationItem>
            <NavigationItem link="/"> Users </NavigationItem>
        </ul>
    )
}

export default NavigationItems