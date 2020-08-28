import React, { Component } from "react";
import classes from './Comment.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

class Comment extends Component {
    state = {
        comment: {
            desc: {
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


        return (
            <Aux>
                <div className={classes.Comment}>
                    <h1>This is comment section.</h1>
                    {form}
                </div>

            </Aux>
        )
    }
}

export default Comment