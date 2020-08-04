import React, { Component } from 'react'
import classes from './FullPost.module.css'
import Aux from '../../hoc/Aux/Aux'
import img from '../../assets/images/img.jpg'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class FullPost extends Component {

    componentDidMount() {
        if(this.props.match.params.id) {
            if(!this.props.loadedPost || (this.props.loadedPost && this.props.loadedPost.id !== this.props.match.params.id)) {
                this.props.onFetchFullPost(this.props.match.params.id)
            }
        }
    }
    
    editHandler = () => {
        console.log(this.props)
        this.props.history.push(this.props.match.url + '/edit')
        // this.props.history.push('/' + '/edit')
    }

    render() {
        // console.log(this.props.loading)
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        // if(this.props.id) {
        //     post = <p style={{textAlign: 'center'}}>Loading...</p>;
        // }
        // console.log("successful sign: ", this.props.isAuth)
        // let redirectSignIn = null
        // if(!this.props.isAuth) {
        //     redirectSignIn = <Redirect to = "/signin" />
        // }

        if(this.props.loading && this.props.isAuth) {
            post = <Spinner />
        }
        
        if(this.props.loadedPost) {
            console.log(this.props.loadedPost)
            post = (
                <Aux>
                    <article className={classes.Container}>
                        <div className={classes.FullPost}>
                            <div className={classes.Meta}>
                            <div className={classes.Photo} style={{backgroundImage: "url(" + img +")"}}></div>
                            </div>
                            <div>
                                <div className={classes.Title}>
                                    <h1>{this.props.loadedPost.title}</h1>
                                </div>
                                <div className={classes.Description}>
                                    <h2>Author: {this.props.loadedPost.author}</h2>
                                    <p>{this.props.loadedPost.desc}</p>
                                    <div>
                                    <h3>Last Modified At: {this.props.loadedPost.lastModifiedDate}</h3>
                                    </div>
                                </div>
                                
                            </div>
                            <div>
                                <button onClick={this.editHandler}>Edit</button>
                            </div>
                        </div>
                    </article>
                </Aux>
            )
            // console.log(post)
        }
        return (  
            <Aux>
                {/* {redirectSignIn} */}
                <section>
                    {/* <h1>HELLO THIS IS FULL POST</h1> */}
                    {post}
                </section> 
            </Aux>
        
            
        )
    }
}

const mapStateToProps = state => {
    return {
        loadedPost: state.post.fullPost,
        loading: state.post.loading,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFullPost: (postId) => dispatch(actions.fetchFullPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost)