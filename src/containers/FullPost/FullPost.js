import React, { Component } from 'react'
import classes from './FullPost.module.css'
import Aux from '../../hoc/Aux/Aux'
import axios from '../../Axios/axios-post'
import img from '../../assets/images/img.jpg'
import Spinner from '../../components/UI/Spinner/Spinner'
class FullPost extends Component {
    state = {
        loadedPost: null,
        loading: true
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
                axios.get('/allPosts/' + this.props.match.params.id)
                .then(response => {
                    this.setState({loadedPost: response.data, loading: false})
                }) .catch(error => {
                    console.log(error)
                    this.setState({loading: false})
                })
            }
        }
    }

    render() {
        console.log(this.props)
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // if(this.props.id) {
        //     post = <p style={{textAlign: 'center'}}>Loading...</p>;
        // }
        if(this.state.loading) {
            post = <Spinner />
        }
        
        if(this.state.loadedPost) {
            console.log(this.state.loadedPost)
            post = (
                <Aux>
                    <article className={classes.Container}>
                        <div className={classes.FullPost}>
                            <div className={classes.Meta}>
                            <div className={classes.Photo} style={{backgroundImage: "url(" + img +")"}}></div>
                            </div>
                            <div>
                                <div className={classes.Title}>
                                    <h1>{this.state.loadedPost.title}</h1>
                                </div>
                                <div className={classes.Description}>
                                    <h2>Author: {this.state.loadedPost.author}</h2>
                                    <p>{this.state.loadedPost.desc}</p>
                                    <div>
                                    <h3>Last Modified At: {this.state.loadedPost.lastModifiedDate}</h3>
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