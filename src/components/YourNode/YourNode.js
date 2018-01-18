import React, { Component } from "react"
import { connect } from "react-redux"
import axios from "axios"

import hangingsign from "./hangingsign.png"
import "./yournode.css"

class YourNode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: []
    }
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      this.setState({ user: response })
    })
  }

  render(props) {
    const { user } = this.props
    console.log(user)
    return (
      <div className="yournodebackground">
        <div className="signanimator">
          <img src={hangingsign} />
          <div className="noaccountfound">
            <p>
              {" "}
              I didn't find any DAoC accounts linked to this profile. Would you
              like to merge an account now?{" "}
            </p>
            <div className="noaccountbuttons">
              <p> YES?</p> <p> NO? (return home) </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {})(YourNode)
