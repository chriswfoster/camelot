import React, { Component } from "react"
import { connect } from "react-redux"
import {
  loadUserInfo,
  selectedAccount,
  getCharacterList,
  inspectCharacter
} from "../../redux/reducer"
import axios from "axios"
import ItemsDisplayed from './ChildCompnents/ItemsDisplayed'

import "./accounttool.css"

class AccountTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountSelectorView: "accountSelector",
      charListView: "hideObjects",
      itemdisplayView: "hideObjects"
    }
  }

  componentDidMount() {
    const { username } = this.props.user
    console.log(username)
   // axios
      //.put("/api/getUserInfo", {
    //    username: username
   //   })
    //  .then(response => {
     //   console.log(response.data)
     //   this.props.loadUserInfo(response.data)
    //  })
  }

  accountSelectHander(account) {
    this.props.selectedAccount(account)
    this.props.getCharacterList(account)
    this.setState({
      accountSelectorView: "accountSelectorOut",
      charListView: "characterListSlideIn"
    })
  }

  render() {
    console.log(this.props)
    const { characterList, inspectCharacter } = this.props
    const { daocaccount } = this.props.user
    const parsedaccounts = daocaccount ? JSON.parse(daocaccount) : null
    const accountlist = daocaccount
      ? parsedaccounts.map((account, i) => (
          <div
            onClick={() => this.accountSelectHander(account)}
            className="accountsbuttons"
            key={i}
          >
            {account}
          </div>
        ))
      : null
    const charList = characterList.map((char, i) => (
      <div key={i} className="characterListSpacing">
        <input
          type="radio"
          value="1"
          name="radio"
          id={`radio${i}`}
          onChange={() => inspectCharacter(char.DOLCharacters_ID)}
        />
        <div htmlFor={`radio${i}`} className="buttonSelector">
          {" "}
          <div />
        </div>
        <label htmlFor={`radio${i}`}>{char.Name}</label>
      </div>
    ))

    return (
      <div style={{ color: "white" }} className="accounttoolbackground">
        <div className={this.state.charListView}>{charList}</div>

        <div className={this.state.accountSelectorView}>
          <div className="accountlistorganizer">
            Which account do you want access to?
            {accountlist ? accountlist : null}
          </div>
        </div>
        <div className={this.state.itemdisplayView}><ItemsDisplayed />
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {
  loadUserInfo,
  selectedAccount,
  getCharacterList,
  inspectCharacter
})(AccountTool)
