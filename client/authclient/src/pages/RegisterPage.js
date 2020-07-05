import React from 'react'
import ReactDOM from 'react-dom'
import MyApp from './../index';
import './../index.css'
var globalConstants = require('../globalconst');

class RegisterPage extends React.Component {

    state = {
        username: '',
        password: '',
        telnum: '',
        address: '',
        email: '',
        registered: false
    };

    registerUser = e => {
        console.log('Registering User')
        console.log(`Username: ${this.state.username}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`telephone: ${this.state.telnum}`);
        console.log(`Address: ${this.state.address}`);
        console.log(`Email: ${this.state.email}`);

        //request server to register user
        fetch(`${globalConstants.BASE_URL}${globalConstants.AUTH_BASE}${globalConstants.REGISTER_API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: this.state.username,
                password: this.state.password,
                telnum: this.state.telnum,
                email: this.state.email,
                address: this.state.address
            })
        }).then(data => data.json()).then(data => this.setState({
            username: '',
            password: '',
            telnum: '',
            address: '',
            email: '',
            registered: data.success
        }));
        e.preventDefault();
    }

    render() {
        return (
            <div className="center">
                <form onSubmit={this.registerUser}>
                    {this.state.registered?(<div>
                        User Registered Successfully!
                    </div>): (
                    <div>
                        Please register the user<br/>
                        </div>)}
                    <label className="header">Username</label><br/>
                    <input type="text" id="username" onChange={(e) => {this.setState({ username: e.target.value })}} />
                    <br/>
                    <label className="header">Password</label><br/>
                    <input type="text" id="password" onChange={(e) => {this.setState({ password: e.target.value })}} />
                    <br/>
                    <label className="header">Telephone Number</label><br/>
                    <input type="tel" id="telnum" onChange={(e) => {this.setState({ telnum: e.target.value })}} />
                    <br/>
                    <label className="header">Address</label><br/>
                    <input type="text" id="address" onChange={(e) => {this.setState({ address: e.target.value })}} />
                    <br/>
                    <label className="header">Email Id</label><br/>
                    <input type="email" id="emailid" onChange={(e) => {this.setState({ email: e.target.value })}} /><br/>
                    <div><input type="submit" value="Submit" /></div>
                </form>
        </div>
        )
    }
}




/*const RegisterPage = () => (
    <div>
        Hello World
        </div>
);*/


/*const RegisterPage = () => (
    <div>
        <form>
            <label className="header">Username</label>
            <input type="text" id="username" onChange={(e) => {}} >Enter Username</input>
            <label className="header">Password</label>
            <input type="text" id="password" onChange={(e) => {}} >Enter Password</input>
            <label className="header">Telephone Number</label>
            <input type="tel" id="telnum" onChange={(e) => {}} >Enter Telephone Number</input>
            <label className="header">Address</label>
            <input type="text" id="address" onChange={(e) => {}} >Enter Address</input>
            <label className="header">Email Id</label>
            <input type="email" id="emailid" onChange={(e) => {}} >Enter email</input>
        </form>
        </div>
);*/

export default RegisterPage;
