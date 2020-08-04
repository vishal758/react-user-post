import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SignUp.module.css'
import { Link, Redirect } from 'react-router-dom'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'

class SignUp extends Component {

    state = {
        signUpCred: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Username'
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
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            },
            roles: {
                validation: {
                    required: false,                    
                },
                valid: true
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
        const updatedSignUpForm = {
            ...this.state.signUpCred
        }

        const updatedSignUpElement = {
            ...updatedSignUpForm[inputIdentifier]
        }

        updatedSignUpElement.value = event.target.value
        updatedSignUpElement.valid = this.checkValidity(updatedSignUpElement.value, updatedSignUpElement.validation)
        updatedSignUpElement.touched = true
        updatedSignUpForm[inputIdentifier] = updatedSignUpElement

        let formIsValid = true
        for(let inputIdentifier in updatedSignUpForm) {
            formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid
        }

        this.setState({signUpCred: updatedSignUpForm, formIsValid: formIsValid})
    }

    submitClicked = (event) => {
        
        event.preventDefault()
        this.setState({loading: true})

        const formData = {}
        
        for(let formElementIdentifier in this.state.signUpCred) {
            formData[formElementIdentifier] = this.state.signUpCred[formElementIdentifier].value
        }
        
        const signUpInfo = formData
        this.props.onSubmitSignUp(signUpInfo)
    }

    render() {
        const formElementsArray = []
        for (let key in this.state.signUpCred) {
            if(key === 'roles') continue
            formElementsArray.push({
                id: key,
                config: this.state.signUpCred[key],
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
                <button className={classes.Animated} onClick={this.submitClicked} disabled={!this.state.formIsValid}>Register</button>
                <div className = {classes.Forgot}>Already have an account?<Link to='/signin'> Login</Link></div>
            </Aux>
                
        )

        if(this.props.loading) {
            form = <Spinner />
        }

        let signUpRedirect = null
        if(this.props.successfulSignUp) {
            signUpRedirect = <Redirect to = "/signin" />
        }

        return (
            <Aux>
                {signUpRedirect}
                <div className={classes.Cont}>
                    <div className={classes.Login}>
                        <h2>
                            Sign Up
                        </h2>
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
        successfulSignUp: state.auth.signUpSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitSignUp: (signUpData) => dispatch(actions.submitSignUp(signUpData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)