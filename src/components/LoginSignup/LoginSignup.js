import React, {Component} from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import './loginsignup.css'
import { connect } from "react-redux"
import { loadUserInfo } from "../../redux/reducer"


class LoginSignup extends Component {
constructor(props){
    super(props)
    this.state={
        registerUsername: "",
        registerPassword: "",
        loginUsername: "",
        loginPassword: "",
        redirect: null
    }
    this.loginUser=this.loginUser.bind(this)
}
redirectLogin(){
window.location.href = "http://localhost:3000/yournode"
}
    handleregisterusername(val){
this.setState({registerUsername: val})
    }

    handleregisterpassword(val){
this.setState({registerPassword: val})
    }

    handleloginusername(val){
        this.setState({loginUsername: val})
    }
    handleloginpassword(val){
        this.setState({loginPassword: val})
    }

    loginUser(un, pw){
    axios.put("/api/loginuser", {
    username: un,
    password: pw
})
    .then(response => {
        console.log(response)
        if (response.data.userid){ 
            this.props.loadUserInfo(response)
        this.setState({redirect: <Redirect to="/yournode"/>})
        } else if (response.data === 'BADPW'){
            alert("That password appears to be incorrent. If you're unable to figure it out, reach out to chriswf for help.")
        } else if (response.data === 'UnknownUser'){
            alert("This Username doesn't appear to be in our system.")
        }
    })
    }

    registerUser(un, pw){
    if (un.length < 1 || pw.length < 1){ alert("You MUST type a username AND password")
    } else if (un.length >= 1 && pw.length >= 1 ){
    alert("Credentials Sent!")
    axios.post("/api/registeruser", {
    username: un,
    password: pw
    })
    .then(response => console.log(response))
    }}



    render(props){
      

        return(
            
            <div className="loginmain">



                <div className="signinbox">
              <div className="signinboxcontentorganizer">
                  
                  <div className="signinboxwindow">
                  <h3>Already a website member? Login below.</h3>
                  <p>Username:</p>
                  <input placeholder="Type Username Here" onChange={(e) => this.handleloginusername(e.target.value)}/>
<p>Password:</p>
<input placeholder="Type Password Here" onChange={(e) => this.handleloginpassword(e.target.value)} />
<p onClick={() => this.loginUser(this.state.loginUsername, this.state.loginPassword)} className="signinbuttons">Click to Login</p>
                      </div>
                  </div>
                  
              
              <div className="signinboxcontentorganizer">
                 
                  <div className="signinboxwindow">
                  <h3> Not a site member yet? Register here!</h3>
<p>Username:</p>
                    <input placeholder="Type Username Here" onChange={(e) => this.handleregisterusername(e.target.value)}/>
<p>Password:</p>
                    <input placeholder="Type Password Here" onChange={(e) => this.handleregisterpassword(e.target.value)} />
                    <p onClick={() => this.registerUser(this.state.registerUsername, this.state.registerPassword)}  className="signinbuttons">Click to Register</p>
                      </div>
                  </div>
              
                    </div>
{this.state.redirect}

                </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {
  loadUserInfo
})(LoginSignup)