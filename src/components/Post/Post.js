import React from 'react';

import './Post.module.css';
import classes from './Post.module.css'
import { Link } from 'react-router-dom'
const post = (props) => {

    return (
        <article>
                <div className={classes.BlogCard}>
                    <div className={classes.Meta}>
                        <div className={classes.Photo} style={{backgroundImage: "url(" + props?.imageUrl +")"}}></div>
                    </div>
                    <div className={classes.Description}>
                        <h1>{props.title}</h1>
                        <h2>Author: {props.author}</h2>
                            <p className={classes.Desc}> {props.desc}</p>
                        {/* <div></div> */}
                        <h3 className={classes.LastModifiedDate}>Last Modified At: {props.lastModifiedDate}</h3>
                        <p className={classes.ReadMore}  onClick={props.clicked}>
                            {/* Read More */}
                            <Link to="">READ MORE</Link>                        
                        </p>
                    </div>
                </div>
            </article>
    )
};

export default post;