import React, { Component } from "react"
import logo from "./daocicon.png"
import axios from "axios"
import Moment from "react-moment"

import "./home.css"

class Home extends Component {
  constructor() {
    super()
    this.state = {
      thenews: []
    }
  }

  componentDidMount() {
    axios
      .get("/api/getthenews")
      .then(response => this.setState({ thenews: response.data }))
  }

  render() {
    const { thenews } = this.state
    let newsarticles;
   {thenews.constructor === Array ? newsarticles = thenews.map((article, i) => (
      <div className="newsfeedpostbox" key={i}>
        <h3>{article.title}</h3>
        <p>{article.postbody}</p>
        <h6>
          Posted <Moment fromNow>{article.postdate}</Moment>, on{" "}
          <Moment format="MMM, DD, YYYY">{article.postdate}</Moment>.
        </h6>
      </div>
    )) : null}
    return (
      <div className="home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Deity Node</h1>
        </header>
        <div className="App-intro">
          <div className="home-whitebox">
            <div>
              {" "}
              <p>
                Hey guys, it's me, Chriswf again. You might remember my last
                server (Broken Borders). If you're reading this, you're probably
                curious as to what I'm up to now.
              </p>
              <p>
                Long story short, I'm a full stack web developer now. More
                importantly, I picked up a couple programmign languages, and a
                ton of tricks and ideas (lots of ideas for a new server).
              </p>
              <p>
                Here's my discord (<b style={{ color: "lightblue" }}>qwsuvh</b>),
                you're free to drop by for a hello, drop ideas in the idea
                channel, etc.
              </p>
              <a
                href="https://discord.gg/TCkYBVx"
                style={{ color: "lightblue" }}
              >
                {" "}
                The new discord chat link, click here.{" "}
              </a>
            </div>
            <div className="blockabovenewsfeed" />
            <h1> News Feed: </h1>
            {newsarticles}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
