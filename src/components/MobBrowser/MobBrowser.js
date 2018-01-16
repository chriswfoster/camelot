import React, {Component} from 'react'
import axios from 'axios'

import './mobbrowser.css'

class MobBrowser extends Component {
    constructor () {
    super ()
    this.state= {
        searchTerm: "",
        searchResponse: []
      }
      }
      
      searchMobs(term){
        axios.put("/api/searchmobs", {
          search: term
        })
        .then(response => {
        this.setState({searchResponse: response.data})
        })
      }
      
      handleSearch(val){
        this.setState({searchTerm: val})
      }
      
    render(){
        const {searchResponse} = this.state
        const searchList = searchResponse.map((item, i) => (
          <tr key={i}>
          <td>{item.Name}</td>
          <td>{item.Level}</td>
          </tr>
        ))
        return(
            <div className="mobbrowsermain">
<div className="mobbrowsercontent">
<h1> Just below, you can browse some of the mobs in the database, by name.</h1>
 <h3> Limited by 100 rows per search.</h3>
<input placeholder="Search mob name here:" type="text" onChange={(e) => this.handleSearch(e.target.value)} />
<button onClick={() => this.searchMobs(this.state.searchTerm)}> Click to Search</button>
{searchList.length > 0? 
          <div>
<table>
<tbody>
<tr>
<th>Mob Name</th>
<th>Mob Level</th> 
</tr>
{searchList}
</tbody>
</table></div> :
<div />}
</div>
                </div>

        )
    }



}
export default MobBrowser