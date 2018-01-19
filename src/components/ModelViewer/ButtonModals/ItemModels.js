import React, {Component} from 'react'
import axios from 'axios'


class ItemModels extends Component{
constructor(){
    super()
    this.state = {
        itemList: [],
        searchTerm: "",
        searchList: [],
        showItems: 25,
        lastArrayIndex: 0
    }
}

    componentDidMount(){
        axios.get('/api/itemlist')
        .then(response => {
             console.log(response.data)
        this.setState({itemList: response.data})    
        })
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
        const {itemList} = this.state
        const thenewarray = []
        const theresults = itemList.filter((item, i) => (item.Category === searchLower  || item.Name.toLowerCase().search(searchLower) > -1 ))
        console.log(theresults.slice(0, showItems))
          while (theresults.length > 0){
        thenewarray.push(theresults.splice(0, showItems))
          }
          this.setState({searchList: thenewarray})
        
    }

    clearSearch(){
        this.setState({searchList: []})
    }

    render(){
        const {itemList, searchList} = this.state
        console.log(searchList[0])
        const viewListPos = searchList.length > 0 ?  searchList[0].map((item, i) => (
            <div key={i}>   
            <p>{item.Name}</p>
                <p>{item.Category}</p>
            <img />
            <p>{item.ModelID}</p>
            </div>
        ) ): null
        return(
            <div className="buttonmodalsizingandflex">
            <h1>Search for Item Models</h1>

            <div>

<input onChange={(e)=> this.handleSearchTerm(e.target.value)} />

<button onClick={() => console.log(this.state)}>Console Log</button>
<button onClick={() => this.ultimateSearch(this.state.searchTerm)}>Search</button>
<button onClick={() => this.clearSearch()}>Clear Search Content</button>


<select defaultValue="25" onChange={(e) => this.handleSearchQuantity(e.target.value)}>
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="100">100</option>
</select>

<div>
{viewListPos}

    </div>
                </div>


                </div>
        )
    }
}
export default ItemModels