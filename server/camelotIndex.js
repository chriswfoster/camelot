const express = require("express")
const { json } = require("body-parser")
const cors = require("cors")
const axios = require("axios");
var bcrypt = require("bcrypt")
const session = require("express-session")
const massive = require("massive")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")
const {
  host,
  user,
  password,
  database,
  mysqlport
} = require("../config.js").sqlInfo
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
var connection = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: mysqlport,
  connectionLimit: 15
})
/////
app.set("connection", connection)
app.set("bcrypt", bcrypt)
app.set("axios", axios)



function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(connection);




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
app.get("/api/itemlist", controller.getItemModelList)
app.get("/api/moblist", controller.getMobModelList)
app.put("/api/searchmobs", controller.mobFinder)
app.put("/api/searchplayersinv", controller.searchPlayersInventory)
app.put("/api/loginuser", controller.loginUser)
app.put('/api/accountverifysearch', controller.accountVerifySearch)
app.put("/api/addGameAccountToWebAccount", controller.addingFirstDaocAccount)
app.put('/api/getUserInfo', controller.getUserInfo)
app.post("/api/registeruser", controller.registerUser)

app.get("/api/me", function(req, res) {
  if (!req.session.user) return res.status(401)
  res.status(200).json(req.session.user)
})

const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

app.listen(port, () => {
  console.log(`Listening on dat port: ${port}`)
})
