import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: '',
        }
    }

    newUser () {
        let path = `/create`;
        this.props.history.push(path);
    };

    handleLogin = async e => {

        e.preventDefault();

        let data = {
            username: this.refs.username.value,
            password: this.refs.psw.value
        };


        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => this.setState({userID: data}));

        console.log(this.state.userID[0].custid);

        if (this.state.userID) {
            let path = `/store/${this.state.userID[0].custid}`;
            this.props.history.push({pathname: path, state: {userID: this.state.userID[0].custid}});
        }

    };


    render() {
        return (
            <div className="Login">
                <section>
                    <form>
                        <nav>
                            <h2>Login to your PACE Bank Account</h2>

                            <label htmlFor="username"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" ref="username" required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" ref="psw" required/>

                            <button type="submit" className="loginButton" id="loginUser"
                                        onClick={this.handleLogin.bind(this)}>Login
                            </button>
                            <button className="loginButton" id="loginUser"
                                    onClick={this.newUser.bind(this)}>CreateNewUser
                            </button>
                        </nav>
                    </form>
                </section>
            </div>
        )
    };
}

export default withRouter(Login);
