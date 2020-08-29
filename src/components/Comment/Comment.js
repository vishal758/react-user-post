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
                    <Button btnType="Danger" className={classes.Danger}>Delete</Button>
                    <Button btnType="Success" className={classes.Danger}>Edit</Button>
                </div>
            </div>
        </article>
    )
};

export default comment;