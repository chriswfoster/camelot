import React, { Component } from 'react';
import logo from './daocicon.png';
import './App.css';
import axios from 'axios'

class App extends Component {
constructor(){
super()
this.state= {
  searchTerm: "",
  searchResponse: []
}
}

searchMobs(term){
  axios.put("/api/searchmobs", {
    search: term
  })
  .then(response => {
  this.setState({searchResponse: response.data})
  })
}

handleSearch(val){
  this.setState({searchTerm: val})
}


  render() {
    const {searchResponse} = this.state
    const searchList = searchResponse.map((item, i) => (
      <tr key={i}>
      <td>{item.Name}</td>
      <td>{item.Level}</td>
      </tr>
    ))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Diety Node</h1>
        </header>
        <div className="App-intro">
        <div className="App-whitebox">
        <p >
          Hey guys, it's me, Chriswf again. 
          You might remember my last server (Broken Borders).
          If you're reading this, you're probably curious as to what I'm up to now.</p>
<p>
          Long story short, I'm a full stack web developer now. More importantly, I picked up a couple programmign languages, and a ton of tricks and ideas (lots of ideas for a new server).
</p><p>
          I'm thinking (and this isn't my final decision), of a way to build your character into becoming rediculously powerful. This will be a server for you to make your character into aGod. 
          I'll give you the ability to push your stats to an all new high, creating a real monster or a god of a character.
          This doesn't have to be limited to stats either. I might create a way for you to redifine properties on your spells/abilities/styles. 
          I really just want a fun playground in the same old environment that we all love so much (DAoC).
        </p>
<p>Here's my discord (qwsuvh), you're free to drop by for a hello, drop ideas in the idea channel, etc.</p>
<a href="https://discord.gg/qwsuvh"> The new discord chat link. </a>

        <p> And just below, you can browse some of the mobs in the database, by name. Limited by 100 rows per search.</p>
        <input onChange={(e) => this.handleSearch(e.target.value)} />
        <button onClick={() => this.searchMobs(this.state.searchTerm)}> Click here for user </button>
        {searchList.length > 0? 
                  <div className="adminSearchTableWidthSpecs">
    <table>
        <tbody>
  <tr>
    <th>Mob Name</th>
    <th>Mob Level</th> 
      </tr>
{searchList}
</tbody>
</table></div> :
<div />}




        </div>
      </div>
      </div>
    );
  }
}

export default App;
