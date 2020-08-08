import React, { Component } from 'react'
import classes from './FullPost.module.css'
import Aux from '../../hoc/Aux/Aux'
import img from '../../assets/images/img1.jpg'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import ModalAction from '../NewPost/ModalAction/ModalAction'
import Modal from '../../components/UI/Modal/Modal'
import { Redirect } from 'react-router'
import Button from '../../components/UI/Button/Button'

class FullPost extends Component {

    state = {
        isDeletePost: false
    }

    componentDidMount() {
        console.log("[fullpost props]:", this.props)
        console.log("[FullPost] token: ", this.props.token)
        if(this.props.match.params.id && !this.props.isPostDeleted) {
            if(!this.props.loadedPost || (this.props.loadedPost && this.props.loadedPost.id !== this.props.match.params.id)) {
                this.props.onFetchFullPost(this.props.match.params.id, this.props.match.params.username, this.props.token)
            }
        }
    }

    componentDidUpdate() {
        if(this.props.match.params.id && this.props.match.params.username) {
            if(this.props.isPostDeleted) return;
            if(!this.props.loadedPost || (this.props.loadedPost && this.props.loadedPost.id !== this.props.match.params.id)) {
                this.props.onFetchFullPost(this.props.match.params.id, this.props.match.params.username, this.props.token)
            }
        }
    }
    
    editHandler = () => {
        console.log(this.props)
        this.props.history.push(this.props.match.url + '/edit')
        // this.props.history.push('/' + '/edit')
    }

    deleteCancelHandler = () => {
        this.setState({isDeletePost: false})
    }
    deleteConfirmHandler = () => {
        this.setState({isDeletePost: false})
        console.log(this.props)
        this.props.onDeletePost(this.props.match.params.id, this.props.loadedPost.author, this.props.token)
    }

    deleteContinue = () => {
        this.setState({isDeletePost: true})
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

        if(this.props.loading ) {
            post = <Spinner />
        }
        
        let deletePost = null

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
                            <div className={classes.Button}>
                                {
                                    this.props.loggedInUsername === this.props.loadedPost.author
                                    ? <Button btnType="Danger" className={classes.Danger} clicked={this.deleteContinue}>Delete</Button>
                                    : null
                                }
                                {
                                    this.props.loggedInUsername === this.props.loadedPost.author
                                        ? <Button btnType = "Success" clicked={this.editHandler}>Edit</Button>
                                        : null                                          
                                }                                
                            </div>
                        </div>
                    </article>
                </Aux>
            )

            if(this.props.loadedPost) {
                deletePost = <ModalAction 
                    message = "Confirm Deleting the Post"
                    actionCancelled={this.deleteCancelHandler}
                    actionConfirmed={this.deleteConfirmHandler} />
            }
            // console.log(post)
        }
            let successDeleteRedirect = null
            if(this.props.isPostDeleted) {
                successDeleteRedirect = <Redirect to="/allPosts" />
            }
        return (  
            <Aux>
                {successDeleteRedirect}
                {/* {redirectSignIn} */}
                <section>
                    {/* <h1>HELLO THIS IS FULL POST</h1> */}
                    {post}
                    <Modal show = {this.state.isDeletePost} modalClosed={this.deleteCancelHandler}>
                        {deletePost}
                    </Modal>
                </section> 
            </Aux>
        
            
        )
    }
}

const mapStateToProps = state => {
    return {
        loadedPost: state.post.fullPost,
        loading: state.post.loading,
        token: state.auth.token,
        isAuth: state.auth.token !== null,
        loggedInUsername: state.auth.username,
        isPostDeleted: state.post.postDeleted
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFullPost: (postId, username, token) => dispatch(actions.fetchFullPost(postId, username, token)),
        onDeletePost: (postId, author, token) => dispatch(actions.deletePost(postId, author, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost)