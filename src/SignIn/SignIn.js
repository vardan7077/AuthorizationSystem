import React from 'react';
import SignUp from '../SignUp/SignUpEmail/SignUpEmail'
import Style from './SignIn.module.css'
import {NavLink } from 'react-router-dom';


const SignIn = (props) => {
    return (
        
        <div className={Style.aut}>
            <h1>How do you want to sign in?</h1>
            <NavLink to="/SignInEmail"><button>With Email</button></NavLink>
            <NavLink to="/SignInFacebook"><button>With Facebook</button></NavLink>
            <NavLink to="/SignInGoogle"><button>With Google</button></NavLink>
            <NavLink to="/SignInFacebook"><button>With Apple</button></NavLink>
        </div>
        
    )
}

export default SignIn