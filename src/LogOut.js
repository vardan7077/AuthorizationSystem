import React, { Component } from 'react';
import axios from 'axios';
import { Link, NavLink, BrowserRouter, Route } from 'react-router-dom';


class LogOut extends Component {
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


    //Delete all information about user
    deleteSession = () => {
        let formData = new FormData;
        formData.append('u_key', this.state.u_key);
        formData.append('delete', 'true');
        axios.post('http://localhost:80/bringx-proj-test/src/Backend/getInfo.php', formData)
            .then(res => {
                if (!res.data['Success'] == 'Deleted') {
                    this.state.error = res.data;
                    this.state.success = '';
                    console.log(res.data);
                } else {

                    this.setState({
                        success: 'Success',
                    });
                    let now = new Date();
                    now.setMonth(now.getMonth() - 1);
                    document.cookie = "u_key = " + this.state.u_key + "; expires = " + now.toUTCString() + ";";

                }
            })
    }


    componentDidMount() {
        this.catchCookieFromBrowser();
        this.deleteSession();

    }

    //Rendering the responde from database
    ErrorSuccessList = () => {
        if (this.state.success != 'Success') {
            let errors = this.state.error;
            errors = errors.map((error) =>
                <li key={error}>{error}</li>
            );
            return (
                <div >
                    <ul>{errors}</ul>
                    <p>{this.state.success}</p>
                </div>
            )
        } else {
            return (
                <div >
                    <h1>Session was successfully deleted!</h1>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                {(this.state.error || this.state.success) != '' && <this.ErrorSuccessList />}
            </div>
        )
    }
}


export default LogOut
