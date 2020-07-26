import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './NewPost.module.css'
import axios from '../../Axios/axios-post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../../components/UI/Input/Input'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import Spinner from '../../components/UI/Spinner/Spinner'

class NewPost extends Component {
    // state = {
    //     post: {
    //         title: '',
    //         desc: ''
    //     },
    //     submittable: false,
    //     submitting: false
    // }

    state = {
        newPost: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            desc: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Description'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        // if(rules.minLength) {
        //     isValid = value.length >= rules.minLength && isValid;
        // }

        // if(rules.maxLength) {
        //     isValid = value.length <= rules.maxLength && isValid;
        // }

        return isValid

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedNewPostForm = {
            ...this.state.newPost
        }

        const updatedNewPostElement = {
            ...updatedNewPostForm[inputIdentifier]
        }

        updatedNewPostElement.value = event.target.value
        updatedNewPostElement.valid = this.checkValidity(updatedNewPostElement.value, updatedNewPostElement.validation)
        updatedNewPostElement.touched = true
        updatedNewPostForm[inputIdentifier] = updatedNewPostElement

        let formIsValid = true
        for(let inputIdentifier in updatedNewPostForm) {
            formIsValid = updatedNewPostForm[inputIdentifier].valid && formIsValid
        }

        this.setState({newPost: updatedNewPostForm, formIsValid: formIsValid})
    }
    // changeHandler = (event) => {
    //     const Post = {...this.state.post}        
    //     const name = event.target.name
    //     const val = event.target.value

    //     if(name === 'title')
    //     Post.title = val
        
    //     if(name === 'description')
    //     Post.desc = val

    //     this.setState({post: Post})

    // }

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

    submitClicked = (event) => {
        event.preventDefault();
        this.setState({loading: true})

        const formData = {}

        for (let formElementIdentifier in this.state.newPost) {
            formData[formElementIdentifier] = this.state.newPost[formElementIdentifier].value
        }

        const newPost = formData
        // this.setState({submitting: true})
        // const post = this.state.post
        axios.post('/users/vishal758/posts', newPost)
        // axios.post('https://burger-react-app-50038.firebaseio.com/post.json', post)
        .then(response => {
            console.log(response.data)
            this.setState({loading: false})
            this.props.history.push({pathname: 'allPosts'})
        })
        .catch(error => {
            this.setState({loading: false})
            console.log(error)
        })
        // alert("Post submitted")
    }
    render() {

        const formElementArray = []
        for(let key in this.state.newPost) {
            formElementArray.push({
                id: key,
                config: this.state.newPost[key]
            })
        }
        
        let form = (
            <form className={classes.Container} onSubmit={this.submitClicked}>
                {
                    formElementArray.map(formElement => (
                        <Input 
                            key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value={formElement.config.value}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            inValid={!formElement.config.valid}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)} 
                            from='newPost' />
                    ))
                }
                <button disabled={!this.state.formIsValid}>SUBMIT POST</button>
            </form>
        )

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <Aux>
                <div className={classes.Print}>
                    <h3 className={classes.Center}>CREATE A POST <FontAwesomeIcon icon={faTwitter} size="sm" /></h3>
                    

                    {/* Title: {this.state.props.post.title} */}
                    {/* <br /> */}

                    {/* Description : {this.state.post.description} */}
                </div>
                <br />
                {form}
                {/* <div className = {classes.Container}>
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
                </div> */}
            </Aux>

        )
    }
}

export default NewPost