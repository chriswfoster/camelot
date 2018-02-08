import React, {Component} from 'react'
import { connect } from "react-redux"
import { loadUserInfo } from "../../redux/reducer"
class AccountTool extends Component{
constructor(){
    super()
    this.state = {

    }
}

componenetDidMount(){
    
    
    this.props.loadUserInfo(user)
}


    render(){
        const {user} = this.props
        const accountlist = user.daocaccount.map((account, i) => (
            <p>{account}</p>
        ))

        return(
            <div style={{color: 'white'}}>
            
            <div>{accountlist}</div>
            




                </div>
        )
    }
}
export default AccountTool