import React, {Component} from 'react'
import axios from 'axios'

import './modelviewer.css'
class ModelViewer extends Component {
constructor (){
    super()
    this.state = {
        itemslist: []
    }
}
componentDidMount(){
    // axios.get('/api/itemlist')
    axios.get('/api/itemlist')
    .then(response => console.log(response))
}

    render(){
        return(
            <div className="modelviewbackground">
                <div className="mainimagebackground">
                    <div className="itemmodelsmain">
                        <p className="modelviewertitles">Item Models</p>
                        <div className="modelviewersearchbutton"> Search Items</div>
                        </div>

                        <div className="mobmodelsmain">
                            <p className="modelviewertitles">Mob Models</p>
                            <div className="modelviewersearchbutton"> Search Mobs </div>
                            </div>

                        <div className="questsmain">
                            <p className="modelviewertitles">Quest Location and Rewards</p>
                            <p> (Native to Chriswf's server only)</p>
                            <p>(Not functioning yet)</p>
                            <div className="modelviewersearchbutton">Search Quests </div>
                            </div>

                            <div className="mobinfomain">
                                <p className="modelviewertitles">Mob Types and Locations</p>
                                <p> (Native to Chriswf's server only)</p>
                                <p> (Also not functioning yet) </p>
                                <div className="modelviewersearchbutton">Search Mob Types</div>
                                </div>
                           


                    </div>
                </div>
        )
    }
}
export default ModelViewer