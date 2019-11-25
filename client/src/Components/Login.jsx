import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import httpClient from '../httpClient';

class Login extends Component {
    state = {
        fields: {
            username: '',
            password: ''
        }
    }

    onInputChange = (e) => {
        this.setState({fields: { ...this.state.fields, [e.target.name]: e.target.value}})
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        httpClient.logIn(this.state.fields).then(user => {
            this.setState({fields: {email: '', password: ''}})
            if(user){
                this.props.onLoginSuccess(user)
                
                this.props.history.push('/')
            }
        })
    }
    render() {
    return(
        <div className="container col-lg-5">
            <h1 className="text-center mb-3">LOGIN</h1>
            <form onChange={(e) => this.onInputChange(e)} onSubmit={(e) => this.onFormSubmit(e)}>
                <label htmlFor="login-username" className="contact-label top-label">Username</label>
                <input type="text" name="username" className="form-control mb-2 text-center" id="login-username" value={this.state.fields.email} placeholder="USERNAME"></input>

                <label htmlFor="login-password" className="contact-label">Password</label>
                <input type="password" name="password" className="form-control mb-4 text-center" id="login-password" value={this.state.fields.password} placeholder="PASSWORD"></input>

                <input type="submit" className="login-btn btn-secondary btn mb-2" value="LOGIN"></input>

                <Link to="/signup"><p className="signup-link text-center mt-2">New? Sign Up Here!</p></Link>
            </form>
        </div>
    )
}
}

export default Login;