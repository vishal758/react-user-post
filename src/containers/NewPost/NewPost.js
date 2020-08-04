import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './NewPost.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../../components/UI/Input/Input'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { Redirect } from 'react-router'

class NewPost extends Component {

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
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

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

    submitClicked = (event) => {
        event.preventDefault();
        // this.setState({loading: true})

        const formData = {}

        for (let formElementIdentifier in this.state.newPost) {
            formData[formElementIdentifier] = this.state.newPost[formElementIdentifier].value
        }

        const newPost = formData
        this.props.onSubmitPost(this.props.username, newPost)
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

        if(this.props.loading) {
            form = <Spinner />
        }

        let redirectNewPost = null
        if(!this.props.isAuth) {
            redirectNewPost = <Redirect to="/signin" />
        }
        
        const submittedRedirect = this.props.submitted ? <Redirect to="/allPosts" /> : null

        return (
            <Aux>
                {redirectNewPost}
                {submittedRedirect}
                <div className={classes.Print}>
                    <h3 className={classes.Center}>CREATE A POST <FontAwesomeIcon icon={faTwitter} size="sm" /></h3>
                </div>
                <br />
                {form}
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.post.loading,
        submitted: state.post.submitted,
        isAuth: state.auth.token !== null,
        username: state.auth.username
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmitPost: (username, postData) => dispatch(actions.submitPost(username, postData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)