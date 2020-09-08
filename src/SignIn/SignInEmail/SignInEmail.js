import React, { Component } from 'react';
import Style from './SignInEmail.module.css'
import axios from 'axios';
import { Link, NavLink, BrowserRouter, Route } from 'react-router-dom';
import Authorization from '../../Authorization/Authorization'


class SignInEmail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            email: '',
            u_key: '',
            password: '',
            error: '',
            success: '',
        }
    }

    //Checking changes on Inputs
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    //Sign in
    SignInButton = (event) => {
        event.preventDefault();
        let formData = new FormData;
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        axios.post('http://localhost:80/bringx-proj-test/src/Backend/signin.php', formData)
            .then(res => {
                if (!res.data['name']) {
                    this.setState({
                        error: res.data,
                        success: ''
                    });
                    console.log(res.data);
                } else {
                    this.setState({
                        success: 'Success',
                        username: res.data['username'],
                        name: res.data['name'],
                        email: res.data['email'],
                        u_key: res.data['u_key']
                    });
                    console.log(res.data);
                    let now = new Date();
                    now.setMonth(now.getMonth() + 1);
                    document.cookie = "u_key = " + this.state.u_key + "; expires = " + now.toUTCString() + ";";

                }
            })
    }

    //Rendering the responde from database
    ErrorSuccessList = () => {
        if (this.state.success != 'Success') {
            let errors = this.state.error;
            errors = errors.map((error) =>
                <li key={error}>{error}</li>
            );
            return (
                <div className={Style.Error}>
                    <ul>{errors}</ul>
                    <p>{this.state.success}</p>
                </div>
            )
        } else {
            
            return (
                <div className={Style.Success}>
                    <NavLink to="/First_page"><button>Next Page</button></NavLink>
                    <ul>
                        <li>Welcome {this.state.name}!</li>
                        <li>Your username is: {this.state.username}</li>
                        <li>Your email address is: {this.state.email}</li>
                    </ul>
                </div>
            )
        }
    }


    render() {
        return (
            <div className={Style.SignIn}>
                <form>
                    <ul>
                        <li><input type="text" className="formControl" onChange={this.handleChange} name="username" id="username" placeholder="Enter your username" /></li>
                        <li><input type="password" className="formControl" onChange={this.handleChange} name="password" id="password" placeholder="Enter password" /></li>
                        <li><button type="submit" onClick={this.SignInButton}>Sign In</button></li>
                    </ul>
                </form>
                <div className={Style.back}>
                    <Link to="/" ><button className={Style.backbutton}>Back</button></Link>
                </div>
                <div>
                    {(this.state.error || this.state.success) != '' && <this.ErrorSuccessList />}
                </div>
            </div>
        )
    }
}

export default SignInEmail