import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {


getFromDb(){
  console.log("fired off")
  axios.get("/api/fromdb")
  .then(response => console.log("this is it ", response))
}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Here.

        </p>
        <button onClick={() => this.getFromDb()}> Click here for user </button>
      </div>
    );
  }
}

export default App;
