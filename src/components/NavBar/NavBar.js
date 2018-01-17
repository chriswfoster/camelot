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
                <p><Link to="/" style={{ textDecoration: 'none', color: 'lightblue',  'textAlign': 'center'}}> HOME </Link></p>
                <p><a href="https://discord.gg/qwsuvh" style={{  textDecoration: 'none', color: 'lightblue'}}>DISCORD</a></p>
                <p><Link to="/mobbrowser" style={{ textDecoration: 'none', color: 'lightblue',  'textAlign': 'center'}}> Browse Database for Mobs</Link></p>
                <p><Link to="/viewplayersinv" style={{ textDecoration: 'none', color: 'lightblue',  'textAalign': 'center'}}> VIEW A PLAYERS INVENTORY!</Link></p>
                <p><Link to="/loginsignup" style={{ textDecoration: 'none', color: 'lightblue',  'textAlign': 'center'}}>Login</Link></p>
                    </Menu>

   
            
                
                
                </div>
        )
    }
}

export default NavBar