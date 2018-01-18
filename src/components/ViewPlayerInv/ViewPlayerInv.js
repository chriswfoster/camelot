import React, { Component } from "react"
import axios from "axios"

import "./viewplayerinv.css"

class ViewPlayerInv extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: "",
      searchResponse: []
    }
  }

  handleSearch(val) {
    this.setState({ searchTerm: val })
  }

  searchPlayers(term) {
    axios
      .put("/api/searchplayersinv", {
        search: term
      })
      .then(response => {
        console.log(response)
        this.setState({ searchResponse: response.data })
      })
  }

  render() {
    const { searchResponse } = this.state
    const searchList = searchResponse.map((item, i) => (
      <tr key={i}>
        <td>
          <center>{item.PlayerName}</center>
        </td>
        <td>
          <center>{item.ItemName}</center>
        </td>
        <td>
          <center>{item.Count}</center>
        </td>
      </tr>
    ))
    return (
      <div className="viewplayerinvmain">
        <div className="mobbrowsercontent">
          <h1>
            {" "}
            Here you can browse another player's inventory, this will include
            personal vaults as well I believe.
          </h1>

          <input
            placeholder="Type Player Name Here:"
            type="text"
            onChange={e => this.handleSearch(e.target.value)}
          />
          <button onClick={() => this.searchPlayers(this.state.searchTerm)}>
            {" "}
            Click to Search{" "}
          </button>
          {searchList.length > 0 ? (
            <div className="tablefontcolor">
              <table>
                <tbody>
                  <tr>
                    <th>Player Name</th>
                    <th>Item Name</th>
                    <th>Count </th>
                  </tr>
                  {searchList}
                </tbody>
              </table>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

export default ViewPlayerInv
