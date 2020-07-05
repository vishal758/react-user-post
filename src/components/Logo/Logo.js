import React from 'react'
import techLogo from '../../assets/images/tech-logo.png'
import classes from './Logo.module.css'
const logo = (props) => {
    return(
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={techLogo} alt="myTech"/>
        </div>
    )
}


export default logo