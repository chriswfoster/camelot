import React, { Component } from "react"
import { connect } from "react-redux"
import { loadUserInfo, selectedAccount } from "../../redux/reducer"
import axios from "axios"

import "./accounttool.css"

class AccountTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: "accountSelector"
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

  render() {
    const { selectedAccount } = this.props
    const { daocaccount } = this.props.user
    const parsedaccounts = daocaccount ? JSON.parse(daocaccount) : null
    const accountlist = daocaccount
      ? parsedaccounts.map((account, i) => (
          <div
            onClick={() => selectedAccount(account)}
            className="accountsbuttons"
          >
            {account}
          </div>
        ))
      : null

    return (
      <div style={{ color: "white" }} className="accounttoolbackground">
        <div className={this.state.currentView}>
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
  selectedAccount
})(AccountTool)
