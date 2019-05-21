import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import Product from './Product';
import Portfolio from "./Portfolio";
import './StoreBank.css'

/**
 * Class of the main Store Page.
 */
class StoreBank extends Component {

    static propTypes = {
        userID: PropTypes.number,
        loggedIn: PropTypes.bool
    };

    /**
     * Constructor
     * @param props
     */
    constructor (props) {
        super(props);

        this.state = {
            portfolio: [],
            products: [],
            loggedIn: (this.props.location.state.loggedIn) ? this.props.location.state.loggedIn : false
        }

    }

    componentWillMount() {
        this.getPortfolio();

    }

    /**
     * Get all products from the portfolio so that a Portfolio component can be made for each.
     * @returns {Promise<void>}
     */
    async getPortfolio () {

        console.log(this.props.match.params.userID);

        let data = {
            id: this.props.match.params.userID,
        };

        const response = await fetch('/api/getPortfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const body = await response.text();

        let arr = JSON.parse(body);

        //[{"portid":851,"prodid":1,"investment":"$1,000.00","approve":true}]

        console.log(JSON.parse(body));

        //for ()

        this.setState({portfolio: arr}, () => {
            console.log(arr);
            this.getProducts();
        })


    }


    /**
     * Get all non paid for products so that a Product component can be made for each.
     * @returns {Promise<void>}
     */
    async getProducts () {

        let data = {
            portfolio: this.state.portfolio,
        };

        const response = await fetch('/api/getProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.text();
        let result = JSON.parse(body);

        let arr = [];

        for (var i = 0; i < result.length; i++) {

            var obj = {id: result[i].prodid, name: result[i].name, minInvest: result[i].mininvest};
            arr.push(obj);

        }

        this.setState({products: arr});



    }



    render() {


        return (

            <div className="StoreBank">
                {(!this.state.loggedIn) ?
                    (<div> YOU MUST BE LOGGED IN TO USE OUR APPLICATION </div>) :
                    (<div>
                        <div className={'PortfolioList'} id = "Portfolio">
                            <h1>Your Portfolio</h1>
                            {this.state.portfolio.map(product => <Portfolio key={ product.prodid} userID = {parseInt(this.props.match.params.userID)} prodID = {parseInt(product.prodid)} product = {product}/>)}
                        </div>

                        <hr/>

                        <div className={'ProductList'} id = "ProductList">
                            <h1>Products</h1>
                            {this.state.products.map(product => <Product key={product.name} userID = {parseInt(this.props.match.params.userID)} product = {product}/>)}
                        </div>
                    </div>
                    )}
            </div>

        )
    }

}


export default withRouter(StoreBank);
