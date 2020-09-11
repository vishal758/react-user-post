import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            {
                props.isAuthenticated 
                    ? <NavigationItem link="/newPost" > New Post </NavigationItem>
                    : null
            }
            <NavigationItem link="/allPosts" > AllPosts </NavigationItem>
            {
                props.isAuthenticated
                    ? <NavigationItem link="/users"> Users </NavigationItem>
                    : null
            }
            {
                props.isAuthenticated
                    ? <NavigationItem link={'/users/' + props.loggedInUser + '/posts'}>My Posts</NavigationItem>
                    : null
            }
            {
                props.isAuthenticated && props.inSideDrawerOnly 
                    ? <NavigationItem link={'/users/' + props.loggedInUser + '/favPosts'}>Fav Posts</NavigationItem>
                    : null
            }
            {
                !props.isAuthenticated
                    ? <NavigationItem link="/signin"> SignIn </NavigationItem>
                    : <NavigationItem link="/logout"> Logout </NavigationItem>
            }
        </ul>
    )
}

export default NavigationItems