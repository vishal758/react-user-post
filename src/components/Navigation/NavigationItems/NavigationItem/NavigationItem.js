import React from 'react'
import classes from './NavigationItem.module.css'
import { NavLink } from 'react-router-dom'
const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                activeClassName="active"
                activeStyle = {{
                    color: 'black',
                    backgroundColor: 'white'
                    
                }}
                to={props.link}
                className={props.active ? classes.active : null}> {props.children}
            </NavLink>
        </li>
    )
}

export default NavigationItem