import React, { Component } from "react";
import classes from './Comments.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Comment from '../../../components/Comment/Comment'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class Comments extends Component {
    state = {
        comment: {
            message: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Comment'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        submitted: false
    }

    checkValidity(value, rules) {
        let isValid = true

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedCommentForm = {
            ...this.state.comment
        }

        const updatedCommentElement = {
            ...updatedCommentForm[inputIdentifier]
        }

        updatedCommentElement.value = event.target.value
        updatedCommentElement.valid = this.checkValidity(updatedCommentElement.value, updatedCommentElement.validation)
        updatedCommentElement.touched = true
        updatedCommentForm[inputIdentifier] = updatedCommentElement

        let formIsValid = true
        for(let inputIdentifier in updatedCommentForm) {
            formIsValid = updatedCommentForm[inputIdentifier].valid && formIsValid
        }

        this.setState({comment: updatedCommentForm, formIsValid: formIsValid})
    }

    submitClicked = (event) => {
        event.preventDefault()

        const formData = {}

        for (let formElementIdentifier in this.state.comment) {
            formData[formElementIdentifier] = this.state.comment[formElementIdentifier].value
        }

        formData['commentBy'] = this.props.loggedInuser

        this.props.onSubmitComment(this.props.postOwner, this.props.postId, formData, this.props.token)
    }

    deleteCommentHandler = (commentId) => {
        this.props.onDeleteComment(this.props.postOwner, this.props.postId, commentId, this.props.token)
    }
    render() {
        const formElementArray = []
        for(let key in this.state.comment) {
            formElementArray.push({
                id: key,
                config: this.state.comment[key]
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
                                from='comment' />
                        ))
                    }   
                    <button disabled={!this.state.formIsValid}>SUBMIT</button>
                
            </form>
        )

        if(this.props.loading) {
            form = <Spinner />
        }

        let userComments = null
        
        if(this.props.comments.length) {
            userComments = this.props.comments.map(
                comment => {
                    return (
                        <Comment 
                        key = {comment.id}
                        author = {comment.commentBy}
                        message = {comment.message}
                        loggedInuser = {this.props.loggedInuser}
                        deleteClicked = {() => this.deleteCommentHandler(comment.id)}
                        />
                    )
                }
            )
        }

        if(this.props.commentSubmitted || this.props.commentDeleted) 
            window.location.reload()    
        return (
            <Aux>
                <div className={classes.Comment}>
                    <h1>Comments section</h1>
                    {form}
                    {userComments}
                </div>

            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInuser: state.auth.username,
        token: state.auth.token,
        commentSubmitted: state.comment.commentSubmitted,
        commentDeleted: state.comment.commentDeleted
    }
}

const mapDisPatchToProps = dispatch => {
    return {
        onSubmitComment: (username, postId, commentData, token) => dispatch(actions.submitComment(username, postId, commentData, token)),
        onDeleteComment: (username, postId, commentId, token) => dispatch(actions.deleteComment(username, postId, commentId, token))
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Comments)