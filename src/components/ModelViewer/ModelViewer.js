import React, {Component} from 'react'

import ItemModels from './ButtonModals/ItemModels'
import MobLocs from './ButtonModals/MobLocs'
import MobModels from './ButtonModals/MobModels'
import QuestTypes from './ButtonModals/QuestTypes'

import './modelviewer.css'
class ModelViewer extends Component {
constructor (){
    super()
    this.state = {
        itemslist: [],
        displayModal: null
    }
}


setDisplayModal(val){
this.setState({displayModal: val})
}

    render(){
        return(
            <div className="modelviewbackground">
            {this.state.displayModal === null ? null
            : <div className="modalsmainbox">{this.state.displayModal}

            <p className="modalCloserX" onClick={() => this.setDisplayModal(null)}> +
                </p>
                </div>}
                <div className="mainimagebackground">
                    <div className="itemmodelsmain maintilesflex">
                        <p className="modelviewertitles">Item Models</p>
                        <p>Search items, weapons, and armor models.
                      <br />Pics and ids.</p>
                        <div className="modelviewersearchbutton" onClick={() => this.setDisplayModal(<ItemModels/>)}> Search Items</div>
                        </div>

                        <div className="mobmodelsmain maintilesflex">
                            <p className="modelviewertitles">Mob Models</p>
                            <p>Search mob/npc models<br />Pics and ids.</p>
                            <div className="modelviewersearchbutton" onClick={() => this.setDisplayModal(<MobModels/>)}> Search Mobs </div>
                            </div>

                        <div className="questsmain maintilesflex">
                            <p className="modelviewertitles">Quest Location<br /> and Rewards</p>
                            <p> (Native to Chriswf's server only)<br />(Not functioning yet)</p>
                            <div className="modelviewersearchbutton">Search Quests </div>
                            </div>

                            <div className="mobinfomain maintilesflex">
                                <p className="modelviewertitles">Mob Types <br />and Locations</p>
                                <p> (Native to Chriswf's server only)<br /> (Partial functionality) </p>
                                <div className="modelviewersearchbutton" onClick={() => this.setDisplayModal(<MobLocs />)}>Search Mob Types</div>
                                </div>
                           


                    </div>
                </div>
        )
    }
}
export default ModelViewer