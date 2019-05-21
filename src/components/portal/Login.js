import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css'



/**
 * Class of Login Page.
 */
class Login extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
        }
    }

    /**
     * Sends the User to the CreateAcc page.
     */
    newUser () {
        let path = `/create`;
        this.props.history.push(path);
    };

    /**
     * Logs the user in to the system.
     * @param e
     * @returns {Promise<void>}
     */
    handleLogin = async e => {

        e.preventDefault();

        //Data collected from log in page.
        let data = {
            username: this.refs.username.value,
            password: this.refs.psw.value
        };


        //Executes Query
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => this.setState({userID: data}));


        /*
        If a userID is returned from the query and set to state, we allow the user to enter the system.
         */
        if (this.state.userID) {
            let path = `/store/${this.state.userID[0].custid}`;
            this.props.history.push({pathname: path, state: {loggedIn: true, userID: this.state.userID[0].custid}});
        }

    };


    render() {
        return (
            <div className="Login">
                <section>
                    <form>
                        <nav>
                            <h2>Login to your PACE Bank Account</h2>

                            <label className="tooltip" htmlFor="username">
                                <b>Username</b>
                                <span className="tooltiptext">Enter the Username of your Account Here </span>
                            </label>
                            <input type="text" placeholder="Enter Username" ref="username" required/>

                            <label className="tooltip" htmlFor="psw">
                                <b>Password</b>
                                <span className="tooltiptext">Enter the Password of your Account Here </span>
                            </label>
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
                <p className='disclaimer'>
                    PACE Bank provides the insert URL here website as a service to the public. PACE Bank is not responsible for, and expressly disclaims all liability for, damages of any kind arising out of use, reference to, or reliance on any information contained within this website.

                    While the information contained within this website is periodically updated, no guarantee is given that the information provided in this website is correct, complete, and up-to-date.

                    Although the PACE Bank website may include links providing direct access to other Internet resources, including websites, PACE Bank is not responsible for the accuracy or content of information contained in these sites.

                    Links from PACE Bank to third-party sites do not constitute an endorsement by PACE Bank of the parties or their products and services. The appearance on this website of advertisements and product or service information does not constitute an endorsement by PACE Bank, and PACE Bank has not investigated the claims made by any advertiser. Product information is based solely on material received from suppliers.
                </p>
            </div>
        )
    };
}

export default withRouter(Login);
