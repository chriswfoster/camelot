import React, { Component } from "react"
import { Link } from "react-router-dom"
import { stack as Menu } from "react-burger-menu"
import "./navbar.css"

class NavBar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="navbarbackground">
        <Menu customBurgerIcon={<img src={require("./menu.png")} alt="Button icon"/>}>
          <div> Site Navigation: </div>
          <p>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "lightblue",
                textAlign: "center"
              }}
            >
              HOME
            </Link>
          </p>
          <p>
            <a
              href="https://discord.gg/qwsuvh"
              style={{ textDecoration: "none", color: "lightblue" }}
            >
              DISCORD
            </a>
          </p>
          <p>
          <Link
              to="/modelviewer"
              style={{
                textDecoration: "none",
                color: "lightblue",
                textAlign: "center"
              }}
            >
              Browse Database for Model IDs, items, quests, and mobs
            </Link></p>
          <p>
            <Link
              to="/viewplayersinv"
              style={{
                textDecoration: "none",
                color: "lightblue",
                textAalign: "center"
              }}
            >
              {" "}
              VIEW A PLAYERS INVENTORY!
            </Link>
          </p>
          <p>
            <Link
              to="/loginsignup"
              style={{
                textDecoration: "none",
                color: "lightblue",
                textAlign: "center"
              }}
            >
              Login
            </Link>
          </p>
        </Menu>
      </div>
    )
  }
}

export default NavBar
