import React, {Component} from 'react'

class ItemsDisplayed extends Component{



    render(){
        const {itemList} = this.props
        const listOfItems = itemList.map((item)=> (
            item.id_nb
        ))
        return(
            <div>
                </div>
        )
    }

}
export default ItemsDisplayed