const express = require("express")
const { json } = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const massive = require("massive")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")
const sqlInfo = require("../config.js")
const { secret } = require("./../config.js").session
const { domain, clientID, clientSecret } = require("../config").auth0
const http = require("http")

////////////To maria db.
var mysql = require("mysql")
var c = mysql.createConnection({
  host: "sqlInfo.host",
  user: "sqlInfo.user",
  password: "sqlInfo.password",
  database: "sqlInfo.db"
})
/////
c.connect()
c.query("SELECT * FROM mob WHERE Name = Armswoman", function(
  err,
  results,
  fields
) {
  if (error) throw error
  console.dir("The solution is: ", results[0])
})
connection.end()

const port = process.env.PORT || 3069

// const io = socketIo(server) // < Interesting!
const controller = require("./controller/controller")

var app = require("express")()

app.use(express.static(`${__dirname}/../build`))

app.use(json())
app.use(cors())

app.use(session) // ATTACH SESSION
// console.log("initial", session) //Session exists at this point

//Auth0

app.use(passport.initialize())
app.use(passport.session())
// console.log("passport sesh", passport.session()) //session object is still intact up to this point
passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      console.log("PROFILE", profile._json.email)
      app
        .get("db")
        .getUserByAuthId([profile.id])
        .then(response => {
          if (!response[0]) {
            const db = app.get("db")
            db
              .createUserByAuth([
                profile.id,
                profile.displayName,
                profile.picture,
                profile._json.email
              ])
              .then(created => {
                return done(null, created[0])
              })
          } else {
            return done(null, response[0])
          }
        })
    }
  )
)

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

let you
app.get("/login", passport.authenticate("auth0"), function(req, res, next) {
  you = req.user
  req.session.user = req.user
  req.user.rank === 3 ? res.redirect("/student") : res.redirect("/mentorview")
})

app.get("/api/fromdb", c.query)

const path = require("path")
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/../build/index.html"))
})

app.listen(port, () => {
  console.log(`Listening on dat port: ${port}`)
})
