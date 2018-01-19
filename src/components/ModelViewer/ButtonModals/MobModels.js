import React, {Component} from'react'
import axios from 'axios'
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
            <div>
                Mob Models
                </div>
        )
    }
}
export default MobModels