import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
//import logo from './logo.svg';
import './Portfolio.css'


class Portfolio extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            investment: '',

        }
    }

    static propTypes = {
        product: PropTypes.object,
        prodID: PropTypes.number,
        userID: PropTypes.number
    };

    componentWillMount() {
        this.getBoughtProducts();
        this.getInvestment();
    }

    async getInvestment () {
        let data = {
            id: this.props.userID,
            prodID: this.props.prodID
        };

        console.log(this.props.userID);
        console.log(this.props.prodID);

        const response = await fetch('/api/getInvestment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.text();
        let result = JSON.parse(body);

        console.log(result);

        this.setState({investment: result[0].investment});

    }
    async getBoughtProducts () {

        let data = {
            id: this.props.prodID,
        };

        const response = await fetch('/api/getBoughtProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.text();
        let result = JSON.parse(body);

        console.log(result);

        this.setState({name: result[0].name});

    };



    render() {
        return (
            <div className="Portfolio">

                <h3>{this.state.name}</h3>

                Investment: {this.state.investment}

            </div>
        )
    }
}


export default withRouter(Portfolio);