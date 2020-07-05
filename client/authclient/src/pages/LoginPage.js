import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import UserDetails from './UserDetails';
var globalConstants = require('../globalconst');

export default ({ history }) => {

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');
  const[loading, setLoading] = useState(false);
  

    const processLogin = (e) => {
    setLoading(true);
    console.log(`Processing login. Username ${username} and password: ${password}`);
    console.log(`Loading: ${loading}`)
    fetch(`${globalConstants.BASE_URL}${globalConstants.AUTH_BASE}${globalConstants.LOGIN_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({//x-www-form-url-encoded
        username: username,
        password: password
      })
    }).then(data => data.json()).then(data => {
      setLoading(false)

      if(data.success) {
        console.log(`Token: ${data.data.token}`);
        console.log(`Loading: ${loading}`);
        console.log(`Server message: ${data.message}`);
        sessionStorage.setItem('usertoken', data.data.token.toString())
        sessionStorage.setItem('username', data.data.user.name.toString())
        //go to UserDetails Screen
        ReactDOM.render(<UserDetails/>, document.getElementById('root'))
      } else {
        console.log(`Authentication Error: ${data.message}`);
      }
    });
    e.preventDefault();
    }

    const showRegisterPage = () => {
        console.log('Navigate to Registration page')
        //ReactDOM.render(<RegisterPage/>, document.getElementById('root'))
        history.push('/register')
      }

      return (
        <>
        <div className="center">
          <form onSubmit={processLogin}>
                <label className="header">Username:</label>
                <br/>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
                <br/><br/>
                <label className="header">Password:</label>
                <br/>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                <br/><br/>
                <div><input type="submit" value="Login" /></div>
              </form>
              <button style={{marginTop:20}} onClick={showRegisterPage}>Register</button>
            </div>
        </>
      );
  };
