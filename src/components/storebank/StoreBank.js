import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
//import { withRouter } from 'react-router-dom';

class StoreBank extends Component {

    static propTypes = {
        userID: PropTypes.number,
    };

    constructor (props) {
        super(props);

        this.state = {
            portfolio: []
        }

    }

    async getPortfolio () {

        console.log(this.props.location.state.userID);

        let data = {
            id: this.props.location.state.userID,
        };

        const response = await fetch('/api/getPortfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const body = await response.text();

        console.log(body);

        this.setState({portfolio: body})


    }


    async getProducts () {

        let data = {
            portfolio: this.state.portfolio,
        };

        console.log(this.state.portfolio);

        const response = await fetch('/api/getProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.text();

        console.log(body);


    }



    render() {

        this.getPortfolio();
        this.getProducts();

        return (
            <div className="Login">
                HELLO
            </div>

        )
    }

}


export default withRouter(StoreBank);
