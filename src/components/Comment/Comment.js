import React from 'react';

import classes from './Comment.module.css'
import Button from '../UI/Button/Button'

const comment = (props) => {

    return (
        <article>
            <div className={classes.Comment}>
                <label>{props.author}</label>
                <p>{props.message}</p>
                <div className={classes.Button}>
                    
                    {props.loggedInuser === props.author ? <Button btnType="Danger" className={classes.Danger} clicked = {props.deleteClicked}>Delete</Button> : null}
                    {/* {props.loggedInuser === props.author ? <Button btnType="Success" className={classes.Sucess}>Edit</Button> : null} */}
                </div>
            </div>
        </article>
    )
};



export default comment;