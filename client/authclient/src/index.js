import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'


class MyApp extends React.Component {

  render() {
    return (
      <Router>
          <Route exact path="/" component={LoginPage}/>
          <Route path="/register" component={RegisterPage}/>
    </Router>
    )
  }
}

ReactDOM.render(<MyApp/>, document.getElementById('root'))

export default MyApp;