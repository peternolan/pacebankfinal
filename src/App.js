import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/portal/Login';
import Store from './components/storebank/StoreBank';
import CreateAcc from './components/portal/CreateAcc';



class App extends Component {

  render () {

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <div className="logo">PACE</div>
                </header>
                <Route path = '/' exact render={() => <Login/>}/>
                <Route path = '/store/:userID' render={() => <Store/>}/>
                <Route path = '/create' render={() => <CreateAcc/>}/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
