import React, { Component } from "react"
import { connect } from "react-redux"
import {
  loadUserInfo,
  selectedAccount,
  getCharacterList
} from "../../redux/reducer"
import axios from "axios"

import "./accounttool.css"

class AccountTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountSelectorView: "accountSelector",
      charListView: "hideObjects",
      fakeCharList: [
          {Name: "blueberry"},
          {Name: "hank"},
          {Name: "Billy"},
          {Name: "Chuck"},
          {Name: "Rodney"},
          {Name: "Killgore"},
          {Name: "Billybob"},
          {Name: "Chriswf"},
          {Name: "AstroNOT"},
          {Name: "Whodatboi"}

      ]
      }
    
  }

  componentDidMount() {
    const { username } = this.props.user
    console.log(username)
    axios
      .put("getUserInfo", {
        username: username
      })
      .then(response => {
        console.log(response.data)
        this.props.loadUserInfo(response.data)
      })
  }

  accountSelectHander(account) {
      
    this.props.selectedAccount(account)
    this.props.getCharacterList(account)
    this.setState({ accountSelectorView: "accountSelectorOut", charListView: "characterListSlideIn" })
  }

  render() {
    console.log(this.props)
    const { selectedAccount, characterList } = this.props
    const { daocaccount } = this.props.user
    const parsedaccounts = daocaccount ? JSON.parse(daocaccount) : null
    const accountlist = daocaccount
      ? parsedaccounts.map((account, i) => (
          <div
            onClick={() => this.accountSelectHander(account)}
            className="accountsbuttons"
            key = {i}
          >
            {account}
          </div>
        ))
      : null
    const charList = this.state.fakeCharList.map((char, i) => (
        
        <div key={i}className ="characterListSpacing">
     
        <input type='radio' value='1' name='radio' id={`radio${i}`} />
        <div for={`radio${i}`} className="buttonSelector"/>
        <label for={`radio${i}`} >{char.Name}</label>

        </div>
      
    ))

    return (
      <div style={{ color: "white" }} className="accounttoolbackground">
        
        <div className={this.state.charListView}>
            {charList}
            </div>
        
        
        <div className={this.state.accountSelectorView}>
          <div className="accountlistorganizer">
            Which account do you want access to?
            {accountlist ? accountlist : null}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {
  loadUserInfo,
  selectedAccount,
  getCharacterList
})(AccountTool)
