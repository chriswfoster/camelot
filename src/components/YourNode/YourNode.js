import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"

import axios from "axios"

import hangingsign from "./hangingsign.png"
import "./yournode.css"

class YourNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: [],
      noorredirect: "NO? (return home)",
      panelview: "false"
    }
  }

  componentDidMount() {
    this.props.user.daocaccount ? this.props.user.daocaccount.length > 0 ?
    this.setState({panelview: "true"}) : this.setState({panelview: "false"}) : this.setState({panelview: "false"})
  }

  redirectchanger() {
    this.setState({ noorredirect: <Redirect to="/" /> })
  }

  render(props) {
    const { user } = this.props
    const {panelview} = this.state
    console.log(user)
    return (
      <div className="yournodebackground">
        <div className="signanimator">
          <img src={hangingsign} />
          {panelview === "false" ? <div className="noaccountfound">
            <p>
              I didn't find any DAoC accounts linked to this profile. Would you
              like to merge an account now?
            </p>
            <div className="noaccountbuttons">
              <p> YES?</p>{" "}
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
