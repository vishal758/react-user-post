import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './NewPost.module.css'
import axios from '../../axios-post'

class NewPost extends Component {
    state = {
        post: {
            title: '',
            desc: ''
        },
        submittable: false,
        submitting: false
    }

    changeHandler = (event) => {
        const Post = {...this.state.post}        
        const name = event.target.name
        const val = event.target.value

        if(name === 'title')
        Post.title = val
        
        if(name === 'description')
        Post.desc = val

        this.setState({post: Post})

    }

    submitHandler = () => {
        let submit = false
        let disInfo = {
            ...this.state.post
        }
        for(let key in disInfo) {
            if(disInfo[key] === "") submit = true
        }

        this.setState({submittable: submit})
    }

    submitClicked = () => {
        this.setState({submitting: true})
        const post = this.state.post
        axios.post('/users/ptyagi/posts', post)
        // axios.post('https://burger-react-app-50038.firebaseio.com/post.json', post)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
        // alert("Post submitted")
    }
    render() {

        // let submit = false
        // let disInfo = {
        //     ...this.state.post
        // }
        // for(let key in disInfo) {
        //     if(disInfo[key] === "") submit = true
        // }

        return (
            <Aux>
                <div className={classes.Print}>
                    <h3 className={classes.Center}>CREATE A POST</h3>
                    {/* Title: {this.state.props.post.title} */}
                    {/* <br /> */}

                    {/* Description : {this.state.post.description} */}
                </div>
                <br />
                <div className = {classes.Container}>
                    <label>
                        Title:                     
                    </label>
                    <input 
                            type="text" 
                            name="title" 
                            value={this.state.post.title}
                            onChange={this.changeHandler}
                            required/>
                    <br />
                    <label>
                        Description:
                    </label>
                    <textarea 
                            type = "text" 
                            name="description" 
                            value={this.state.post.desc} 
                            onChange={this.changeHandler}
                            required/> 
                    <button 
                        onClick={this.submitClicked}>Submit</button>
                </div>
            </Aux>

        )
    }
}

export default NewPost