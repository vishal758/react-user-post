import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import NewPost from '../NewPost/NewPost'
import Modal from '../../components/UI/Modal/Modal'
import Submitted from '../NewPost/Submitted/Submited'
import axios from '../../axios-post'
import Posts from '../Posts/Posts'

class UserPost extends Component {
    
    // state = {
    //     post: {
    //         title: '',
    //         description: ''
    //     },
    //     submittable: false,
    //     submitting: false
    // }
    // changeHandler = (event) => {
    //     const Post = {...this.state.post}        
    //     const name = event.target.name
    //     const val = event.target.value

    //     if(name === 'title')
    //     Post.title = val
        
    //     if(name === 'description')
    //     Post.description = val

    //     this.setState({post: Post})

    // }

    // submitHandler = () => {
    //     let submit = false
    //     let disInfo = {
    //         ...this.state.post
    //     }
    //     for(let key in disInfo) {
    //         if(disInfo[key] === "") submit = true
    //     }

    //     this.setState({submittable: submit})
    // }

    // submitClicked = () => {
    //     this.setState({submitting: true})
    //     axios.get('/allPosts')
    //     .then(response => {
    //         console.log(response.data)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    //     // alert("Post submitted")
    // }
    render() {
        // let submit = false
        // let disInfo = {
        //     ...this.state.post
        // }
        // for(let key in disInfo) {
        //     if(disInfo[key] === "") submit = true
        // }
        return(
            <div></div>
            // <Aux>
                /* <h1>Welcome to Our Site</h1> */
                /* <Modal show={this.state.submitting}>
                    <Submitted />
                    
                </Modal> */
                /* <Posts /> */
                /* <NewPost 
                    changed = {this.changeHandler} 
                    post = {this.state.post}
                    clicked={this.submitClicked}
                    submit={submit}/> */
            // </Aux>
        )
    }
}

export default UserPost