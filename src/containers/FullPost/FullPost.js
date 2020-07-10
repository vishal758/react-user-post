import React, { Component } from 'react'
import classes from './FullPost.module.css'
import Aux from '../../hoc/Aux/Aux'
import axios from '../../axios-post'
import img from '../../assets/images/img.jpg'

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if(this.props.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/allPosts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                }) .catch(error => {
                    console.log(error)
                })
            }
        }
    }

    render() {
        console.log("this.props.id: " + this.props.id)
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {
            console.log(this.state.loadedPost)
            post = (
                <Aux>
                    <h1 style={{textAlign: "center"}}>lorem ispum da pel lorem !</h1>
                    <article className={classes.Container}>
                        <div className={classes.FullPost}>
                            {/* main div */}
                            <div className={classes.Meta}>
                            <div className={classes.Photo} style={{backgroundImage: "url(" + img +")"}}></div>
                                {/* PIC SECTION */}
                            </div>
                            <div>
                                {/* content section including heading */}
                                <div className={classes.Title}>
                                    <h1>{this.state.loadedPost.title}</h1>
                                    {/* heading section */}
                                </div>
                                <div className={classes.Description}>
                                    <h2>Author: {this.state.loadedPost.author}</h2>
                                    <p>{this.state.loadedPost.desc}</p>
                                    {/* content section */}
                                    <div>
                                    {/* <p></p> */}
                                    <h3>Last Modified at: {this.state.loadedPost.lastModifiedDate}</h3>
                                    {/* author and last modified date */}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </article>
                </Aux>
            )
            // console.log(post)
        }
        return (           
            post
        )
    }
}

export default FullPost