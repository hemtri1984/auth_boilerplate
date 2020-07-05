import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MyApp from './../index';
var globalConstants = require('../globalconst');

class UserDetails extends Component {

    processLogout = () => {
        console.log('Processing Logout')
        //First delete the session token and username
        sessionStorage.removeItem('usertoken')
        sessionStorage.removeItem('username')
        //now move to login page
        ReactDOM.render(<MyApp/>, document.getElementById('root'))
    }

    constructor(props) {
        super (props);
        this.state = {
            data:'',
            loading: false
        }
    }
    render() {
        return (
            <div className="header">
            <div>
                {this.state.loading ? "Loading... Please Wait!": <div>
                <>
                    <div>Below are the details of logged in user: <h1> {this.state.data.name}</h1></div>
                    <p>Telephone Num: {this.state.data.telnum}</p>
                    <p>Address: {this.state.data.address}</p>
                    <p>EmailID: {this.state.data.emailid}</p>

                    <br />
                    <button onClick={this.processLogout}>Logout</button>
                </>
                </div>}
            </div>
        </div>
        )
    }

    componentDidMount() {
        //fetch the data from server if user is loggedIn
        if(sessionStorage.getItem('usertoken') !== undefined) {//get user details from server
            this.setState({oading: true})
            fetch(`${globalConstants.BASE_URL}${globalConstants.AUTH_BASE}${globalConstants.USER_DATA}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-access-token': sessionStorage.getItem('usertoken'),
                    'username': sessionStorage.getItem('username')
                }
            }).then(data => data.json()).then(data => this.setState(
                { 
                  data: data.user,
                  loading: false
                }
              ))
        }
    }
}

export default UserDetails;