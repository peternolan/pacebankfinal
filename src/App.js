import React, { Component } from 'react';

//mport logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/portal/Login';


class App extends Component {

  render () {

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    PACE
                </header>
                <Login/>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
