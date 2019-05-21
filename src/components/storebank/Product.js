import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
//import logo from './logo.svg';
import './Product.css'

class Product extends Component {

    static propTypes = {
        product: PropTypes.object,
        userID: PropTypes.number,
    };



    componentWillMount() {
        console.log(this.props.product);
    };

    buyProduct = async e =>  {

        e.preventDefault();

        console.log('Buy Product');

        let data = {
            id: this.props.product.id,
            userID: this.props.userID,
            minInvest: parseFloat(this.props.product.minInvest),
            currentInvest: parseFloat(this.refs.invest.value),
        };

        const response = await fetch('/api/buyProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const body = await response.text();

        window.location.reload();

        console.log(body)

    };

    render() {
        return (
            <div className="Product">

                <h3>{this.props.product.name}</h3>

                Minimum Investment: {this.props.product.minInvest}

                <form>
                    Investment: <input className={'minInvest'} type="text" placeholder="Enter Investment: ####.##" ref="invest" />
                    <button className="buyButton" id="buyProduct"
                            onClick={this.buyProduct.bind(this)}>Buy Product</button>
                </form>
            </div>
        )
    }

}

export default withRouter(Product);