import React, { Component } from "react"
import { connect } from "react-redux"

class ItemsDisplayed extends Component {
  render() {
    const { itemList } = this.props
    const listOfItems = itemList.map(item => item.Name)
    return <div />
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {})(ItemsDisplayed)
