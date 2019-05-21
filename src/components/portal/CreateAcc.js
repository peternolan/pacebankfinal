import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import './CreateAcc.css'


/**
 * Class of Create Account Page.
 */
class CreateAcc extends Component {

    constuctor() {
        this.routeChange = this.routeChange.bind(this);
    }

    /*
    handleNewUser:
    Creates a new user from the provided information. Data comes from the create user form.

     */

    handleNewUser = async e => {

        e.preventDefault();

        //Collected Data
        let data = {
            username: this.refs.username.value,
            password: this.refs.psw.value,
            employed: this.refs.empStat.value,
            firstName: this.refs.fn.value,
            lastName: this.refs.ln.value,
            salary: this.refs.salary.value,
            email: this.refs.email.value,
        };

        //Execute Query
        const response = await fetch('/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        //Receive Results
        const body = await response.text();

        //If the returned message says that an account was created, we return to the login page.
        if (body === 'account created') {
            let path = `/`;
            this.props.history.push(path);
        }

    };


    /**
     * Handles cancel, brings the user back to the Login page.
     */
    handleCancel() {
        let path = `/`;
        this.props.history.push(path);
    }

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

                            <label ><b>Email</b></label>
                            <input type="text" placeholder="Enter Email" ref="email" required/>

                            <label ><b>Employment Status</b></label>
                            <input type="checkbox" ref="empStat"/>

                            <label ><b>Salary</b></label>
                            <input type="text" placeholder="Enter Salary as 00.00" ref="salary"/>

                            <button type="submit" className="loginButton" id="loginUser"
                                    onClick={this.handleNewUser.bind(this)}>Submit
                            </button>
                            <button className="cancelButton" id="cancelUser"
                                    onClick={this.handleCancel.bind(this)}>Cancel
                            </button>
                        </nav>
                    </form>
                </section>
            </div>
        )
    };
}

export default withRouter(CreateAcc);
