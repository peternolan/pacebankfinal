import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
//import logo from './logo.svg';
import './Portfolio.css'


/**
 * Class of Portfolio item container.
 */
class Portfolio extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            investment: '',

        }
    }

    static propTypes = {
        product: PropTypes.object, //Product information
        prodID: PropTypes.number, //Product ID
        userID: PropTypes.number //User/Portfolio ID
    };


    componentWillMount() {
        this.getBoughtProducts();
        this.getInvestment();
    }

    /**
     * Get information on the investment amount within the portfolio entry.
     * @returns {Promise<void>}
     */
    async getInvestment () {

        //Data to enter into query
        let data = {
            id: this.props.userID,
            prodID: this.props.prodID
        };

        /**
         * Get investment amount investment from query.
         * @type {Response}
         */
        const response = await fetch('/api/getInvestment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        //Result of query
        const body = await response.text();
        let result = JSON.parse(body);

        //Set the state of the investment
        this.setState({investment: result[0].investment});

    }

    /**
     * Get the list of bought products from the portfolio.
     * @returns {Promise<void>}
     */
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