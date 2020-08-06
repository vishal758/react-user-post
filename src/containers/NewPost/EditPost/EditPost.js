import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './EditPost.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../../../components/UI/Input/Input'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index'
import { Redirect } from 'react-router'

class EditPost extends Component {

    componentDidMount() {
        console.log("mount state edit:", this.state.editPost)
        const updatedEditPostForm = {
            ...this.state.editPost
        }
        if(this.props.isAuth) {
            for(let formElementIdentifier in updatedEditPostForm) {
                const updatedEditPostElement = {
                    ...updatedEditPostForm[formElementIdentifier]
                }
                updatedEditPostElement.value = this.props.editPostData[formElementIdentifier]
                updatedEditPostForm[formElementIdentifier] = updatedEditPostElement
            }
            this.setState({editPost: updatedEditPostForm})
        }
    }

    state = {
        editPost: {
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
        const updatedEditPostForm = {
            ...this.state.editPost
        }

        const updatedEditPostElement = {
            ...updatedEditPostForm[inputIdentifier]
        }

        updatedEditPostElement.value = event.target.value
        updatedEditPostElement.valid = this.checkValidity(updatedEditPostElement.value, updatedEditPostElement.validation)
        updatedEditPostElement.touched = true
        updatedEditPostForm[inputIdentifier] = updatedEditPostElement

        let formIsValid = true
        for(let inputIdentifier in updatedEditPostForm) {
            formIsValid = updatedEditPostForm[inputIdentifier].valid && formIsValid
        }

        this.setState({editPost: updatedEditPostForm, formIsValid: formIsValid})
    }

    submitClicked = (event) => {
        event.preventDefault();
        // this.setState({loading: true})

        const formData = {}

        for (let formElementIdentifier in this.state.editPost) {
            formData[formElementIdentifier] = this.state.editPost[formElementIdentifier].value
        }

        const editPost = formData
        this.props.onEditPost(this.props.editPostData.author, this.props.editPostData.id, editPost, this.props.token)
    }

    render() {
        console.log("mount render edit", this.state.editPost)
        const formElementArray = []
        for(let key in this.state.editPost) {
            formElementArray.push({
                id: key,
                config: this.state.editPost[key]
            })
        }
        
        console.log('formElementArray', formElementArray)
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
                            from='editPost' />
                    ))
                }
                <button 
                    // disabled={!this.state.formIsValid}
                    >Submit</button>
            </form>
        )

        if(this.props.loading) {
            form = <Spinner />
        }
        
        let redirectEdit = null
        if(!this.props.isAuth) {
            redirectEdit = <Redirect to="/signin" />
        } else {
            if(this.props.editSuccess) {
                let url = '/allPosts/';
                redirectEdit = <Redirect to={url}  />
            }
        }

        return (
            <Aux>
                {redirectEdit}
                <div className={classes.Print}>
                    <h3 className={classes.Center}>Edit A POST <FontAwesomeIcon icon={faTwitter} size="sm" /></h3>
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
        editPostData: state.post.fullPost,
        isAuth: state.auth.token !== null,
        token: state.auth.token,
        submitted: state.post.submitted,
        editSuccess: state.post.postEdited
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onEditPost: (username, id, editPostData, token) => dispatch(actions.editPost(username, id, editPostData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)