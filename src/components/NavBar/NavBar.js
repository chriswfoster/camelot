import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { stack as Menu } from 'react-burger-menu'
import './navbar.css'

class NavBar extends Component {
constructor(){
    super()
    this.state = {
        // toDisplay: "hide"
    }
}

// showNavbarModal(){
//     this.state.toDisplay === "hide" ? this.setState({toDisplay: "show"})
//     : 
//     this.setState({toDisplay: "hide"})
// }



    render(){
        return(
            <div className="navbarbackground" >
                <Menu>
                    <div> Site Navigation: </div>
                <p><Link to="/" style={{ textDecoration: 'none', color: 'white'}}><center> HOME </center> </Link></p>
                <p><Link to="/viewplayersinv" style={{ textDecoration: 'none', color: 'white'}}><center> VIEW A PLAYERS INVENTORY</center></Link></p>
                    </Menu>

               {/* {this.state.toDisplay === "show" ? 
<div className="dropdownanimator">

                <p><Link to="/"> HOME </Link></p>
                <p><Link to="/viewplayersinv"> VIEW A PLAYERS INVENTORY</Link></p>
     </div>           
                : <div />} */}
            
                
                
                </div>
        )
    }
}

export default NavBar