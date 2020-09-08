import React, { Component } from 'react';
import Style from './SignUpEmail.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


class SignUpEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      username: '',
      password: '',
      password_2: '',
      error: '',
      success: ''
    }


  }


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
          <h1>Congratulations! Your accaunt was created!</h1>
        </div>
      )
    }
  }



  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  SignUpButton = event => {
    event.preventDefault();
    //formData.append('command', this.state.fullname);
    let formData = new FormData;
    formData.append('fullname', this.state.fullname);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('password_2', this.state.password_2);
    formData.append('username', this.state.username);
    axios.post('http://localhost:80/bringx-proj-test/src/Backend/check.php', formData)
      .then(res => {
        if (res.data != 'Success') {
          this.setState({ error: res.data });
          console.log(res.data);
        } else {
          this.setState({ success: 'Success' });
          console.log(res.data);
        }
      })


  }




  render() {

    return (
      <div className={Style.SignUp}>
        <form>
          <ul>
            <li><input type="text" className="formControl" onChange={this.handleChange} name="fullname" id="fullname" placeholder="Enter your full name" /></li>
            <li><input type="email" className="formControl" onChange={this.handleChange} name="email" id="email" placeholder="Enter your Email" /></li>
            <li><input type="text" className="formControl" onChange={this.handleChange} name="username" id="username" placeholder="Enter username" /></li>
            <li><input type="password" className="formControl" onChange={this.handleChange} name="password" id="password" placeholder="Enter password" /></li>
            <li><input type="password" className="formControl" onChange={this.handleChange} name="password_2" id="password_2" placeholder="Repeat password" /></li>
            <li><button type="submit" onClick={this.SignUpButton}>Sign Up</button></li>
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

export default SignUpEmail