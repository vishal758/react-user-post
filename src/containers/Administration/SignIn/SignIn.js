import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SignIn.module.css'
import { Link, Redirect } from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

class SignIn extends Component {

    componentDidMount() {
        if(this.props.isAuth) {
            this.props.onSetAuthRedirectPath("/allPosts")
        }
    }
    state = {
        signInCred: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Username'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedSignInForm = {
            ...this.state.signInCred
        }

        const updatedSignInElement = {
            ...updatedSignInForm[inputIdentifier]
        }

        updatedSignInElement.value = event.target.value
        updatedSignInElement.valid = this.checkValidity(updatedSignInElement.value, updatedSignInElement.validation)
        updatedSignInElement.touched = true
        updatedSignInForm[inputIdentifier] = updatedSignInElement

        let formIsValid = true
        for(let inputIdentifier in updatedSignInForm) {
            formIsValid = updatedSignInForm[inputIdentifier].valid && formIsValid
        }

        this.setState({signInCred: updatedSignInForm, formIsValid: formIsValid})
    }

    submitClicked = (event) => {

        event.preventDefault()
        this.setState({loading: true})

        const formData = {}
        
        for(let formElementIdentifier in this.state.signInCred) {
            formData[formElementIdentifier] = this.state.signInCred[formElementIdentifier].value
        }

        const signInInfo = formData
        this.props.onSubmitSignIn(signInInfo)
    }

    render() {

        const formElementsArray = []
        for (let key in this.state.signInCred) {
            formElementsArray.push({
                id: key,
                config: this.state.signInCred[key],
            })
        }

        let form = (
                    <Aux>
                        {
                            formElementsArray.map(formElement => (
                                <Input 
                                    key = {formElement.id} 
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value} 
                                    shouldValidate = {formElement.config.validation}
                                    touched={formElement.config.touched}
                                    inValid={!formElement.config.valid} 
                                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                            ))
                        }

                        <button className={classes.Animated} onClick={this.submitClicked} disabled={!this.state.formIsValid}>SignIn</button>
                        <div className = {classes.Forgot}>Don't have an account?<Link to='/signup'> SignUp</Link></div>
                    </Aux>                        
        )

        if(this.props.loading) {
            form = <Spinner />
        }

        let signInRedirect = null
        if(this.props.isAuth) {
            if(this.props.authRedirectPath === '/')
                signInRedirect = <Redirect to = '/allPosts' />
            else
                signInRedirect = <Redirect to = {this.props.authRedirectPath} />

        }
        return (
            <Aux>
                {signInRedirect}
                <div className={classes.Cont}>
                    <div className={classes.Login}>
                        <h2>Sign In</h2>
                        {form}
                    </div>                    
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        successfulSignIn: state.auth.signInSuccess,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitSignIn: (signIncred) => dispatch(actions.signIn(signIncred)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)