import React, {Component} from 'react'
import axios from 'axios'


class ItemModels extends Component{
constructor(){
    super()
    this.state = {
        itemlist: []
    }
}

    componentDidMount(){
        // axios.get('/api/itemlist')
        axios.get('/api/itemlist')
        .then(response => console.log(response))
    }


    render(){
        return(
            <div>
                </div>
        )
    }
}
export default ItemModels