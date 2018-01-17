const express = require("express")
const { json } = require("body-parser")
const cors = require("cors")
var bcrypt = require('bcrypt');
const session = require("express-session")
const massive = require("massive")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")
const {host, user, password, database, mysqlport} = require("../config.js").sqlInfo
const { secret } = require("./../config.js").session
const { domain, clientID, clientSecret } = require("../config").auth0
const port = process.env.PORT || 3069

const app = express()
app.use(json())
app.use(cors())
const controller = require("./controller/controller")


app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
)



////////////To maria db.
var mysql = require("mysql")
var connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  port: mysqlport
})
/////
app.set("connection", connection)
app.set("bcrypt", bcrypt)

function blah (req, res, next){

connection.query("SELECT * from mob where Name = 'shark'", function (error, results, fields) {
    if (error) throw error;
    console.log(results)
   return res.status(200).send(results)
  })
  

}


const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


// bcrypt.genSalt(saltRounds, function(err, salt) {
//   bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//     connection.query(`insert into webusers(name, password) values('chriswf', '${hash}')`, function (error, results, fields) {
//       if (error) throw error;
//       console.log(results)

//     })
    
//   });
// });

// connection.query(`SELECT password from webusers WHERE name = 'chriswf'`, function (error, results, fields) {
//         if (error) throw error;
//         console.log(results[0].password)
//       var hash = results[0].password
//     bcrypt.compare(myPlaintextPassword, "hash").then(function(res) {
//       console.log(res)
//   })
//       })
    




app.use(express.static(`${__dirname}/../build`))


// app.use(session) // ATTACH SESSION
// // console.log("initial", session) //Session exists at this point

//Auth0
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
)




app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/yourpage" //this is the page they'll land on. Could make it their user page.
  })
)


app.get("/api/logout", function(req, res, next) {
  req.session.destroy()
  res.redirect("/login")
})


///////// HERE IS THE DB FUNCTION
app.get("/api/getthenews", controller.getNewsFeed)
app.put("/api/searchmobs", controller.mobFinder)
app.put("/api/searchplayersinv", controller.searchPlayersInventory)
app.put('/api/loginuser', controller.loginUser)
app.post('/api/registeruser', controller.registerUser)









const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

app.listen(port, () => {
  console.log(`Listening on dat port: ${port}`)
})
