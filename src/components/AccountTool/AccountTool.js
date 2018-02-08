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
      .then(response => this.props.loadUserInfo(response.data))
  }

  render() {
    const { daocaccount } = this.props.user
    const accountlist = daocaccount
      ? daocaccount.map((account, i) => <p>{account}</p>)
      : null

    return (
      <div style={{ color: "white" }}>
        <div>{accountlist}</div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {
  loadUserInfo
})(AccountTool)
