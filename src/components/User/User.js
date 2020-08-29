import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faLinkedin, faGithub, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import classes from './User.module.css'

const user = (props) => {

    return (

        <article>

            <div className={classes.User}>
                <div className={classes.Image}>
                    <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="John" />
                </div>
                <div className={classes.Cont}>
                    <h1>{props.username}</h1>
                    <p className={classes.Title}>{props.email}</p>
                    <p>Software Developer</p>
                    <div style={{margin: 'auto'}}>
                        <a href><FontAwesomeIcon icon = {faLinkedin} size="sm"/></a>
                        <a href><FontAwesomeIcon icon = {faGithub} size="sm"/></a>
                        <a href><FontAwesomeIcon icon = {faTwitter} size="sm"/></a>
                        <a href><FontAwesomeIcon icon = {faFacebook} size="sm"/></a>                        
                    </div>
                    <p><button onClick={props.clicked}>See Posts</button></p>
                </div>
            
            </div>
        </article>
    )
}

export default user