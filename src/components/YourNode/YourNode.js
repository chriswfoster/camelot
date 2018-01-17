import React, {Component} from 'react'
import { connect } from "react-redux"
import axios from 'axios'

class YourNode extends Component{
constructor(props){
    super(props)
    this.state = {
        user: []
    }
}

componentDidMount(){
    axios.get('/api/me')
    .then(response => {
     this.setState({user: response})})
}


    render(props){
        const {user} = this.props
        console.log(user)
        return(
            <div>
                <button onClick={()=> console.log(this.state)}> Click for state</button>
                <button onClick={() => console.log(this.props)}> Click for props</button>

            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {})(YourNode)

