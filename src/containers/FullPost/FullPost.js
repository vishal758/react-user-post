import React, { Component } from 'react'
import classes from './FullPost.module.css'
import Aux from '../../hoc/Aux/Aux'
import axios from '../../Axios/axios-post'
import img from '../../assets/images/img.jpg'

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
                axios.get('/allPosts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({loadedPost: response.data})
                }) .catch(error => {
                    console.log(error)
                })
            }
        }
    }

    render() {
        console.log(this.props)
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {
            console.log(this.state.loadedPost)
            post = (
                <Aux>
                    {/* <h1 className = {classes.Head} >lorem ispum da pel lorem !</h1> */}
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
                                    <h3>Last Modified At: {this.state.loadedPost.lastModifiedDate}</h3>
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
            <section>
                {/* <h1>HELLO THIS IS FULL POST</h1> */}
                {post}
            </section>         
            
        )
    }
}

export default FullPost