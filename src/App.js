import React, { Component } from 'react';
//mport logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/portal/Login';
import Store from './components/storebank/StoreBank';



class App extends Component {

  render () {

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    PACE
                </header>
                <Route path = '/' exact render={() => <Login/>}/>
                <Route path = '/store' render={() => <Store/>}/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
