import React from 'react';

import './Post.module.css';
import classes from './Post.module.css'
import img from '../../assets/images/img.jpg'
import { Link } from 'react-router-dom'
const post = (props) => {
    // <article className="Post" onClick={props.clicked}>
    //     <h1>{props.title}</h1>
    //     <div className="Info">
    //         <div className="Author">{props.author}</div>
    //     </div>
    // </article>
    // <div className={classes.Photo} style={{backgroundImage: `url("https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg")`}}></div>

    return (
        <article>
                <div className={classes.BlogCard}>
                    <div className={classes.Meta}>
                        <div className={classes.Photo} style={{backgroundImage: "url(" + img +")"}}></div>
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

            // <div class="blog-card alt">
            //     <div class="meta">
            //         <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg)"></div>
            //         <ul class="details">
            //             <li class="author"><a href="#">Jane Doe</a></li>
            //             <li class="date">July. 15, 2015</li>
            //             <li class="tags">
            //             {/* <ul>
            //                 <li><a href="#">Learn</a></li>
            //                 <li><a href="#">Code</a></li>
            //                 <li><a href="#">JavaScript</a></li>
            //             </ul> */}
            //             </li>
            //         </ul>
            //     </div>
            //     <div class="description">
            //         <h1>Mastering the Language</h1>
            //         <h2>Java is not the same as JavaScript</h2>
            //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
            //         <p class="read-more">
            //             <a href="#">Read More</a>
            //         </p>
            //     </div>
            // </div>

    )
    


};

export default post;