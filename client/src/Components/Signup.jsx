import React, { Component } from 'react'
import httpClient from '../httpClient';

class Signup extends Component {
    state = {
        fields: {
            firstName: '', 
            lastName: '', 
            email: '', 
            password: ''
        }
    }

    onInputChange = (e) => {
        this.setState({fields: {...this.state.fields, [e.target.name]: e.target.value}})
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        httpClient.signUp(this.state.fields).then(user => {
            this.setState({fields: {firstName: '', lastName: '', username: '', password: ''}})
            if(user){
                this.props.onSignUpSuccess(user)
                this.props.history.push('/')
            }
        })
    }
    render() {
        const {firstName, lastName, username, email, password} = this.state.fields
    return(
        <div className="container col-sm-5">
            <h1 className="text-center">SIGNUP</h1>
            <form onChange={(e) => this.onInputChange(e)} onSubmit={(e) => this.onFormSubmit(e)}>
            <label htmlFor="signup-firstName" className="contact-label top-label">First Name</label>
            <input type="text" className="form-control text-center mb-2" name="firstName" placeholder="FIRST NAME" value={firstName} id="signup-firstName"></input>

            <label htmlFor="signup-lastName" className="contact-label">Last Name</label>
            <input type="text" className="form-control text-center mb-2" name="lastName" placeholder="LAST NAME" value={lastName} id="signup-lastName"></input>

            <label htmlFor="signup-email" className="contact-label">Email</label>
            <input type="email" className="form-control text-center mb-2" name="email" placeholder="EMAIL" value={email} id="signup-email"></input>

            <label htmlFor="signup-username" className="contact-label">Username</label>
            <input type="text" className="form-control text-center mb-2" name="username" placeholder="USERNAME" value={username} id="signup-username"></input>

            <label htmlFor="signup-password" className="contact-label">Password</label>
            <input type="password" className="form-control text-center mb-3" name="password" placeholder="PASSWORD" value={password} id="signup-password"></input>

            <input type="submit" value="SIGN UP" className="btn btn-secondary signup-btn"></input>
            </form>
        </div>
    )
    }
}

export default Signup;