import React, { Component } from 'react';
import router from './router'
import './App.css';
import axios from 'axios'

class App extends Component {
constructor(){
super()
}

  render() {
  
    return (
      <div>
       {router}
      </div>
    );
  }
}

export default App;
