import React from 'react';
import SignUp from './SignUp/SignUp'
import SignUpEmail from './SignUp/SignUpEmail/SignUpEmail'
import SignInEmail from './SignIn/SignInEmail/SignInEmail'
import SignIn from './SignIn/SignIn'
import Authorization from './Authorization/Authorization'
import FirstPage from './FirstPage'
import { BrowserRouter,  Route, Link } from 'react-router-dom';
import LogOut from './LogOut'

const App = (props) => {
  return (
    <BrowserRouter>

      <div>
        <Route exact path = '/' component={Authorization} />
        <Route path='/SignInEmail' component={SignInEmail} />
        <Route path='/SignIn' component={SignIn} />
        <Route path='/SignUp' component={SignUp} />
        <Route path='/SignUpEmail' component={SignUpEmail} />
        <Route path ='/First_page' component={FirstPage} />
        <Route path ='/LogOut' component={LogOut} />

      </div>
    </BrowserRouter>
  );
}



export default App;
