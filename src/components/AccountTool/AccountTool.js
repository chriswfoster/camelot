import React, { Component } from "react"
import { connect } from "react-redux"
import { loadUserInfo } from "../../redux/reducer"
import axios from "axios"
class AccountTool extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componenetDidMount() {
    const { user } = this.props
    axios
      .put("getUserInfo", {
        username: user.username
      })
      .then(response => console.log(response)

    )
  }

  render() {
    const { daocaccount } = this.props.user
    const parsedaccounts = daocaccount ? JSON.parse(daocaccount) : null
    const accountlist = daocaccount ? parsedaccounts.map((account, i) => <p>{account}</p>)
      : null

    return (
      <div style={{ color: "white" }}>
        <div>Which account do you want access to?
        {accountlist ? accountlist : null}
        
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {
  loadUserInfo
})(AccountTool)
