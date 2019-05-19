import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import './Login.css'

class Login extends Component {

    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

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
        });

        const body = await response.text();

        if (body === 'logged in') {
            let path = `/store`;
            this.props.history.push(path);
        }

        console.log(body)

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
                        </nav>
                    </form>
                </section>
            </div>
        )
    };
}

export default withRouter(Login);
