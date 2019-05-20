import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import Product from './Product';
//import { withRouter } from 'react-router-dom';
import './StoreBank.css'

class StoreBank extends Component {

    static propTypes = {
        userID: PropTypes.number,
    };

    constructor (props) {
        super(props);

        this.state = {
            portfolio: [],
            products: [],
        }

    }

    componentWillMount() {
        this.getPortfolio();

    }


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

        console.log(body.length);
        console.log(JSON.parse(body));

        //for ()

        this.setState({portfolio: arr}, () => {
            this.getProducts();
        })


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
        let result = JSON.parse(body);
        console.log(result);
        console.log(result.length);

        let arr = [];

        for (var i = 0; i < result.length; i++) {

            var obj = {id: result[i].prodid, name: result[i].name, minInvest: result[i].mininvest};
            console.log(obj);
            arr.push(obj);

        }

        this.setState({products: arr});



    }



    render() {


        return (

            <div className="StoreBank">
                <div id = "Portfolio">

                    Hello

                </div>

                <hr/>

                <div className={'ProductList'} id = "ProductList">
                    <h1>Products</h1>
                    {this.state.products.map(product => <Product key={product.name} userID = {parseInt(this.props.match.params.userID)} product = {product}/>)}
                </div>
            </div>

        )
    }

}


export default withRouter(StoreBank);
