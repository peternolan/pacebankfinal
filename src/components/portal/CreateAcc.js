import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import './CreateAcc.css'

class CreateAcc extends Component {

    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

    handleNewUser = async e => {

        e.preventDefault();

        let data = {
            username: this.refs.username.value,
            password: this.refs.psw.value,
            employed: this.refs.empStat.value,
            firstName: this.refs.fn.value,
            lastName: this.refs.ln.value,
            salary: this.refs.salary.value
        };

        console.log(data);

        const response = await fetch('/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.text();

        if (body === 'account created') {
            let path = `/`;
            this.props.history.push(path);
        }

        console.log(body)

    };


    render() {
        return (
            <div className="CreateAcc">
                <section>
                    <form>
                        <nav>
                            <h2>Create New PACE Bank Account</h2>

                            <label htmlFor="username"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" ref="username" required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" ref="psw" required/>

                            <label ><b>First Name</b></label>
                            <input type="text" placeholder="Enter First Name" ref="fn" required/>

                            <label ><b>Last Name</b></label>
                            <input type="text" placeholder="Enter Last Name" ref="ln" required/>

                            <label ><b>Employment Status</b></label>
                            <input type="checkbox" ref="empStat"/>

                            <label ><b>Salary</b></label>
                            <input type="text" placeholder="Enter Salary as 00.00" ref="salary"/>

                            <button type="submit" className="loginButton" id="loginUser"
                                    onClick={this.handleNewUser.bind(this)}>Submit
                            </button>
                        </nav>
                    </form>
                </section>
            </div>
        )
    };
}

export default withRouter(CreateAcc);
