import React from 'react';

export default ({ history }) => {

    const processLogin = (e) => {
    console.log(`Processing login. Username ${this.state.username} and password: ${this.state.password}`)

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
                <input type="text" id="username" onChange={(e) => {this.setState({username:e.target.value})}}/>
                <br/><br/>
                <label className="header">Password:</label>
                <br/>
                <input type="password" id="password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                <br/><br/>
                <div><input type="submit" value="Login" /></div>
              </form>
              <button style={{marginTop:20}} onClick={showRegisterPage}>Register</button>
            </div>
        </>
      );
  };
