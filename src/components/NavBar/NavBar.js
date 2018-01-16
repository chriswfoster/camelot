import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { stack as Menu } from 'react-burger-menu'
import menu from './menu.png'
import './navbar.css'

class NavBar extends Component {
constructor(){
    super()
    this.state = {
    
    }
}

handleLogin() {
    window.location.href = "/login"
  }


    render(){
        return(
            <div className="navbarbackground" >
                <Menu customBurgerIcon={ <img src={require('./menu.png')}/> }>
                    <div> Site Navigation: </div>
                <p><Link to="/" style={{ textDecoration: 'none', color: 'lightblue'}}><center> HOME </center> </Link></p>
                <p><a href="https://discord.gg/qwsuvh" style={{  textDecoration: 'none', color: 'lightblue'}}>DISCORD</a></p>
                <p><Link to="/mobbrowser" style={{ textDecoration: 'none', color: 'lightblue'}}><center> Browse Database for Mobs</center></Link></p>
                <p><Link to="/viewplayersinv" style={{ textDecoration: 'none', color: 'lightblue'}}><center> VIEW A PLAYERS INVENTORY!</center></Link></p>
                <p onClick={() => this.handleLogin()}>Login</p>
                    </Menu>

   
            
                
                
                </div>
        )
    }
}

export default NavBar