import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import AccountTool from '../AccountTool/AccountTool'
import axios from "axios"

import hangingsign from "./hangingsign.png"
import "./yournode.css"

class YourNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      noorredirect: "NO? (return home)",
      typedaccounttext: "",
      panelview: "false",
      accountaddpanel: "false",
      accountCharacters:[],
      firstCharacter: "Unverified",
      secondCharacter: "Unverified",
      thirdCharacter: "Unverified",
      redirect: "no redirect"
    }
  }

  componentDidMount() {
    this.props.user.daocaccount ? this.props.user.daocaccount.length > 2 ?
    this.setState({panelview: "true"}) : this.setState({panelview: "false"}) : this.setState({panelview: "false"})
  }

  redirectchanger() {
    this.setState({ noorredirect: <Redirect to="/" /> })
  }
  viewChanger(status){
this.setState({panelview: status})
  }
  accountTyper(val){
this.setState({typedaccounttext: val})
  }

  accountVerifySearch(account){
      axios.put('/api/accountverifysearch', {
          daocaccountname: account
      })
      .then(response => {
          console.log(response)
        if (response.data === "UnknownUser"){
            alert("That DAoC account name doesn't seem to exist in our database. Try again, maybe with case sensitivity.")
        } else if ( response.data === "No Characters"){
            alert("That account exists, but you'll need 3 characters/toons to verify it exists! Have 3 characters on your account, then try again.")
        } else this.setState({panelview: "enteraccounts", accountCharacters: response.data})
        })
  }
verifyCharacterOne(val){
    const {accountCharacters} = this.state
    var upperCaseNames = this.state.accountCharacters.map(value => value.Name.toUpperCase())
      var pos = upperCaseNames.indexOf(val.toUpperCase())
      console.log(pos)
      if (pos === -1){
        this.setState({firstCharacter: "Unverified"})
      } else{
           accountCharacters.splice(pos, 1)
            this.setState({firstCharacter: "Verified!"})
}}
verifyCharacterTwo(val){
    const {accountCharacters} = this.state
    var upperCaseNames = this.state.accountCharacters.map(function(value) {
        return value.Name.toUpperCase()
        })
          var pos = upperCaseNames.indexOf(val.toUpperCase())
          if (pos === -1){
            this.setState({secondCharacter: "Unverified"})
          } else{
            accountCharacters.splice(pos, 1)
             this.setState({secondCharacter: "Verified!"})}
}
verifyCharacterThree(val){
    const {accountCharacters} = this.state
    var upperCaseNames = this.state.accountCharacters.map(function(value) {
        return value.Name.toUpperCase()
        })
          var pos = upperCaseNames.indexOf(val.toUpperCase())
          if (pos === -1){
            this.setState({thirdCharacter: "Unverified"})
          } else{
            accountCharacters.splice(pos, 1)
             this.setState({thirdCharacter: "Verified!"})}
}


  render(props) {
    const { user } = this.props
    const {panelview, firstCharacter, secondCharacter, thirdCharacter} = this.state
    console.log(user)
    return (
      <div className="yournodebackground">
        <div className="signanimator">
          <img src={hangingsign} alt="Hanging sign image"/>
          {panelview === "enteraccounts" ?

<div className="signmaintext"> 
            <p>Type the names of 3 different characters on your account. This is account verification!</p>
            {firstCharacter === "Verified!" ? <p>{firstCharacter}</p> : <input placeholder=" 1st Character Name" onChange={(e) => this.verifyCharacterOne(e.target.value)}/>}
            {secondCharacter === "Verified!" ? <p>{secondCharacter}</p> : <input placeholder=" 2nd Character Name" onChange={(e) => this.verifyCharacterTwo(e.target.value)}/>}
            {thirdCharacter === "Verified!" ? <p>{thirdCharacter}</p> :<input placeholder=" 3rd Character Name" onChange={(e) => this.verifyCharacterThree(e.target.value)}/>}
            {firstCharacter === "Verified!" & secondCharacter === "Verified!" & thirdCharacter === "Verified!"?
            <button onClick={() => this.setState({noorredirect: <Redirect to="/accounttool"/>})}>Submit</button>: <p>Enter 3 characters to continue</p>}

              </div>:
              
              
              
              
              panelview === "accountadd" ?
          <div className="signmaintext"> 
            <p>
                Type the name of your DAoC account.
                </p>
            <input placeholder="DAoC Account Here" onChange={(e) => this.accountTyper(e.target.value)}/>   <div className="accountcreatenextbutton" onClick={()=> this.accountVerifySearch(this.state.typedaccounttext)}> NEXT → </div>
            </div> :
              panelview === "false" ? <div className="signmaintext">
            <p>
              I didn't find any DAoC accounts linked to this profile. Would you
              like to merge an account now?
            </p>
            <div className="noaccountbuttons">
              <p onClick={()=> this.viewChanger("accountadd")}>YES?</p>
              <p onClick={() => this.redirectchanger()}>
                {this.state.noorredirect}
              </p>
            </div>
          </div>: <div> pewpz </div>}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {})(YourNode)
