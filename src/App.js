import React, { Component } from 'react';
import router from './router'

import NavBar from './components/NavBar/NavBar'

import './App.css'




class App extends Component {


  render() {
  
    return (
      <div className="App">
<NavBar />
       {router}
      </div>
    );
  }
}

export default App;
