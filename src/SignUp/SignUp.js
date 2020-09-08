import React from 'react';
import SignUpEmail from './SignUpEmail/SignUpEmail'
import Style from './SignUp.module.css'
import {NavLink } from 'react-router-dom';


const SignIn = (props) => {
    return (
        
        <div className={Style.aut}>
            <h1>How do you want to sign up?</h1>
            <NavLink to="/SignUpEmail"><button>With Email</button></NavLink>
            <NavLink to="/SignUpFacebook"><button>With Facebook</button></NavLink>
            <NavLink to="/SignUpGoogle"><button>With Google</button></NavLink>
            <NavLink to="/SignUpFacebook"><button>With Apple</button></NavLink>
        </div>
        
    )
}

export default SignIn