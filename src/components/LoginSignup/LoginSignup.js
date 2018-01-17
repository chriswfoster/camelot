import React, {Component} from 'react'

import axios from 'axios'
import './loginsignup.css'

class LoginSignup extends Component {
constructor(){
    super()
    this.state={
        registerUsername: "",
        registerPassword: "",
        loginUsername: "",
        loginPassword: ""
    }
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
    .then(response => console.log(response))
    }

    registerUser(un, pw){
        alert("Credentials Sent!")
axios.post("/api/registeruser", {
    username: un,
    password: pw
})
.then(response => console.log(response))
    }
    render(){
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


                </div>
        )
    }
}
export default LoginSignup