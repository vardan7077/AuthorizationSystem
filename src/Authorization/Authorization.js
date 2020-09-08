import React from 'react';
import Style from './Authorization.module.css'
import {NavLink } from 'react-router-dom';


const Authorization = (props) => {
    return (
        
        <div className={Style.aut}>
            <h1>Welcome to the app!</h1>
            <h2>What do you want to do?</h2>
            <NavLink to="/SignUp"><button>Sign up</button></NavLink>
            <NavLink to="/SignIn"><button>Sign in</button></NavLink>
            <NavLink to="/Guest"><button>Continue as a guest</button></NavLink>
        </div>
        
    )
}

export default Authorization