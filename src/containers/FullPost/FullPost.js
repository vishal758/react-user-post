import React, { Component } from 'react'
import classes from './FullPost.module.css'
import Aux from '../../hoc/Aux/Aux'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import ModalAction from '../NewPost/ModalAction/ModalAction'
import Modal from '../../components/UI/Modal/Modal'
import { Redirect } from 'react-router'
import Button from '../../components/UI/Button/Button'
import Comments from './Comments/Comments'

import { Bookmark, BookmarkBorder } from '@material-ui/icons'


class FullPost extends Component {

    state = {
        isDeletePost: false,
        img: null,
    }

    componentDidMount() {
        // console.log("[fullpost props]:", this.props)
        // console.log("[FullPost] token: ", this.props.token)
        if(this.props.match.params.id && !this.props.isPostDeleted) {
            if(!this.props.loadedPost || (this.props.loadedPost && this.props.loadedPost.id !== this.props.match.params.id)) {
                this.props.onFetchFullPost(this.props.match.params.id, this.props.match.params.username, this.props.token)
            }
        }

        this.props.onIsFavPost(this.props.token, this.props.loggedInUsername, this.props.match.params.id)
    }

    componentDidUpdate() {
        if(this.props.match.params.id && this.props.match.params.username) {
            if(this.props.isPostDeleted) return;
            if(!this.props.loadedPost || (this.props.loadedPost && this.props.loadedPost.id !== this.props.match.params.id)) {
                this.props.onFetchFullPost(this.props.match.params.id, this.props.match.params.username, this.props.token)
                this.props.onIsFavPost(this.props.token, this.props.loggedInUsername, this.props.match.params.id)
            }
        }
    }
    
    editHandler = () => {
        this.props.history.push(this.props.match.url + '/edit')
        // this.props.history.push('/' + '/edit')
    }

    deleteCancelHandler = () => {
        this.setState({isDeletePost: false})
    }
    deleteConfirmHandler = () => {
        this.setState({isDeletePost: false})
        this.props.onDeletePost(this.props.match.params.id, this.props.loadedPost.author, this.props.token)
    }

    deleteContinue = () => {
        this.setState({isDeletePost: true})
    }

    addOrRemoveFromFavPosts = () => {
        let isFav = this.props.favFlag ? true: false
        this.props.onFavPost(this.props.token, this.props.loggedInUsername, this.props.match.params.id, isFav)
    }

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if(this.props.loading && this.props.isAuth) {
            post = <Spinner />
        }
        
        let deletePost = null

        if(this.props.loadedPost) {
            // console.log(this.props.loadedPost)
            post = (
                <Aux>
                    <article className={classes.Container}>
                        <div className={classes.FullPost}>
                            <div className={classes.Meta}>
                            <div className={classes.Photo} style={{backgroundImage: "url(" + this.props.loadedPost?.imageUrl +")"}}></div>
                            </div>
                            <div>
                                <div className={classes.Title}>
                                    <h1>{this.props.loadedPost.title}</h1>                                   
                                </div>
                                <div className={classes.Description}>
                                 
                                    <h2>Author: {this.props.loadedPost.author} &nbsp;    
                                    
                                        <div className={classes.SaveIcon} onClick={this.addOrRemoveFromFavPosts}>
                                        {this.props.favFlag === true ? <Bookmark /> : <BookmarkBorder />}
                                        </div>
                                    
                                    </h2>
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
                            <div>
                                <Comments 
                                    comments = {this.props.loadedPost.comments}
                                    postId = {this.props.loadedPost.id} 
                                    postOwner = {this.props.loadedPost.author}/>
                            </div>
                        </div>
                        
                    </article>
                </Aux>
            )

            if(this.props.loadedPost) {
                deletePost = <ModalAction 
                    message = "Confirm Deleting the Post"
                    actionCancelled={this.deleteCancelHandler}
                    mess = "CONTINUE"
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
        isPostDeleted: state.post.postDeleted,
        favFlag: state.post.favFlag
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFullPost: (postId, username, token) => dispatch(actions.fetchFullPost(postId, username, token)),
        onDeletePost: (postId, author, token) => dispatch(actions.deletePost(postId, author, token)),
        onFavPost: (token, loggedInUsername, postId, isFav) => dispatch(actions.favPosts(token, loggedInUsername, postId, isFav)),
        onIsFavPost: (token, loggedInUsername, postId) => dispatch(actions.isFavPost(token, loggedInUsername, postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost)