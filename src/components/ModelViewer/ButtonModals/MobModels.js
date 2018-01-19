import React, {Component} from'react'
import axios from 'axios'

import './buttonmodals.css'

class MobModels extends Component{
constructor(){
    super()
    this.state = {

    }
}


componentDidMount(){
    // axios.get('/api/itemlist')
    axios.get('/api/moblist')
    .then(response => console.log(response))
}



    render(){
        return(
            <div className="buttonmodalsizingandflex">
                
                </div>
        )
    }
}
export default MobModels