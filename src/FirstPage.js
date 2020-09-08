import React, { Component } from 'react';
import Style from './FirstPage.module.css'
import axios from 'axios';
import {NavLink} from 'react-router-dom';


class FirstPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            email: '',
            u_key: '',
            password: '',
            success: '',
            error: '',
        }

    }

    //Get Cookie from Document.cookie file
    getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    //Get Cookie from Browser and put it to the state u_key
    catchCookieFromBrowser = () => {
        if (this.state.u_key === '') {
            let key = this.getCookie('u_key')
            if (key != '') {
                console.log(key);
                this.state.u_key = key; 
                this.state.success = "Success"; 
            }
            console.log(this.state.u_key)
        }
    }


    //Get all information from DB about user
    getInfoFromDB = () => {
        let formData = new FormData;
        formData.append('u_key', this.state.u_key);
        formData.append('delete', 'False');
        axios.post('http://localhost:80/bringx-proj-test/src/Backend/getInfo.php', formData)
            .then(res => {
                if (!res.data['name']) {
                    this.setState({
                        error: res.data,
                        success:'',

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
                    console.log(this.state.email)
                    let now = new Date();
                    now.setMonth(now.getMonth() + 1);
                    document.cookie = "u_key = " + this.state.u_key + "; expires = " + now.toUTCString() + ";";
                    
                }
            })
    }
    

    //Rendering the responde from database
    ErrorSuccessList = () => {
        if (this.state.success == 'Success') {
            return (
                <div className={Style.Success}>
                    <ul>
                        <li>Welcome {this.state.name}!</li>
                        <li>Your username is: {this.state.username}</li>
                        <li>Your email address is: {this.state.email}</li>
                    </ul>
                    <NavLink to="/LogOut"><button>Log out</button></NavLink>
                </div>
            )
        }
        else{
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
        }
    }

    
    componentDidMount() {
        this.catchCookieFromBrowser();
        this.getInfoFromDB();
       
    }

    render() {
        console.log(this.state.email)
        return (
            <div className={Style.Success} >
                <NavLink to="/"><button>Back</button></NavLink>
                {(this.state.error || this.state.success) != '' && <this.ErrorSuccessList />}
            </div>
        )
    }
}


export default FirstPage