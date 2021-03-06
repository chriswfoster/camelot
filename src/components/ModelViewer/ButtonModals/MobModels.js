import React, {Component} from'react'
import axios from 'axios'

import './buttonmodals.css'

class MobModels extends Component{
constructor(){
    super()
    this.state =  this.state = {
       mobList: [],
        searchTerm: "",
        searchList: [],
        showItems: 25,
        lastArrayIndex: 0,
        pageNumbers: [],
        pageNumber: 1
    }
}


componentDidMount(){
   
    axios.get('/api/moblist')
    .then(response => {
   this.setState({mobList: response.data}) })
}
handleSearchTerm(val){
    this.setState({searchTerm: val})
}
handleSearchQuantity(val){
    this.setState({showItems: val})
}

ultimateSearch(search){
    const searchLower = search.toLowerCase()
    const showItems = parseInt(this.state.showItems, 10)
    const {mobList} = this.state
    const thenewarray = []
    const pagenumbers = []
    const theresults = mobList.filter((item, i) => (item.Category === searchLower  || item.Name.toLowerCase().search(searchLower) > -1 || item.ModelId === parseInt(searchLower, 10) ))
      while (theresults.length > 0){
    thenewarray.push(theresults.splice(0, showItems))
      }
    for(var j = 0; j < thenewarray.length; j++){
        pagenumbers.push(j + 1)
    }
    this.setState({searchList: thenewarray, pageNumbers: pagenumbers,  pageNumber: 1})
}

clearSearch(){
    this.setState({searchList: [],pageNumbers: []})
}

render(){
    const {searchList, pageNumber, pageNumbers} = this.state

    const pageNumbersList = pageNumbers.map((page, i) => (
        <span key={i} style={page === pageNumber ? {color: 'white'}: {color: 'blue'}}className="pageNumberColors" onClick={()=> this.setState({pageNumber: page})}>{page}, </span>
    ))
    const viewList = searchList.length > 0 ?  searchList[pageNumber - 1].map((mob, i) => (

        <div key={i} className="viewlisttiles">   
        <p style={{borderBottom: 'outset', borderColor: 'grey'}}>Name: {mob.Name}</p>
         <img src={`https://raw.githubusercontent.com/chriswfoster/DOLModels/master/DolModels/src/mobs/${mob.ModelId}.jpg`}  alt="If you see this, there is probably no image for this item."/>
        <p style={{borderTop: 'inset', borderColor: 'grey'}}>Model ID: {mob.ModelId}</p>
        </div> 

    ) ): null
 
    return(
        <div className="buttonmodalsizingandflex">
        <h1>Search for MOB/NPC Models</h1>

        <div>

<input onChange={(e)=> this.handleSearchTerm(e.target.value)} onKeyPress={(e) => e.key === 'Enter' ? this.ultimateSearch(this.state.searchTerm) : null} />
<button onClick={() => this.ultimateSearch(this.state.searchTerm)}>Search</button>
<button onClick={() => this.clearSearch()}>Clear Search Content</button>


<select defaultValue="25" onChange={(e) => this.handleSearchQuantity(e.target.value)}>
<option value="25">25 Results Per Page</option>
<option value="50">50 Results Per Page</option>
<option value="100">100 Results Per Page</option>
</select>
{pageNumbersList.length > 0 ? <div>Page: {pageNumbersList}</div>  : null }
            </div>
            <div className="viewlistflex">
{viewList}

{pageNumbersList.length > 0 ? <div>Page: {pageNumbersList}</div>  : null }
</div>

            </div>
    )
}
}
export default MobModels