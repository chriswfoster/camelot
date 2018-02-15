module.exports = {
  mobFinder: (req, res, next) => {
    const connection = req.app.get("connection")
    const { search } = req.body

    connection.query(
      `SELECT DISTINCT Name, Level FROM mob WHERE Name LIKE '%${search}%' ORDER BY Name LIMIT 100`,
      function(error, results, fields) {
        if (error) console.log(error)

        return res.status(200).send(results)
      }
    )
  },

  searchPlayersInventory: (req, res, next) => {
    const connection = req.app.get("connection")
    const { search } = req.body

    connection.query(
      `SELECT dc.Name as PlayerName, tp.Name as ItemName, nv.Count  from inventory nv JOIN itemtemplate tp ON nv.ITemplate_Id = tp.Id_nb JOIN dolcharacters dc ON dc.DOLCharacters_id = nv.OwnerID WHERE dc.Name LIKE '%${search}%' ORDER BY dc.Name asc, tp.Name LIMIT 300`,
      function(error, results, fields) {
        if (error) console.log(error)

        return res.status(200).send(results)
      }
    )
  },

  getNewsFeed: (req, res, next) => {
    const connection = req.app.get("connection")
    const { search } = req.body

    connection.query(`SELECT * FROM newsfeed ORDER BY post_id DESC`, function(
      error,
      results,
      fields
    ) {
      if (error) console.log(error)

      return res.status(200).send(results)
    })
  },

  registerUser: (req, res, next) => {
    const connection = req.app.get("connection")
    const bcrypt = req.app.get("bcrypt")
    const { username, password } = req.body
    const saltRounds = 10

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        connection.query(
          `insert into webusers(username, password, daocaccount) values('${username}', '${hash}', '[]');`,
          function(error, results, fields) {
            if (error) {
              if (error.code === "ER_DUP_ENTRY") {
                return res.status(200).send({ status: "ALREADY EXISTS" })
              } else console.log(error)
              return res.status(500).send()
            } else if (results.affectedRows > 0) {
              connection.query(
                `SELECT * FROM webusers WHERE username = '${username}'`,
                function(error, results, fields) {
                  if (error) {
                    console.log(error)
                    res.status(200).send({ status: "Broke" })
                  } else req.session.user = results
                  return res.status(200).send(results)
                }
              )
            }
          }
        )
      })
    })
  },
  loginUser: (req, res, next) => {
    const connection = req.app.get("connection")
    const bcrypt = req.app.get("bcrypt")
    const { username, password } = req.body

    connection.query(
      `SELECT * from webusers WHERE username = '${username}'`,
      function(error, results, fields) {
        if (error) {
          console.log(error)
        } else if (results.length > 0) {
          var hash = results[0].password
          bcrypt.compare(password, hash).then(function(answer) {
            if (answer == true) {
              req.session.user = results[0]
              res.status(200).send(results[0])
            } else if (answer == false) {
              res.status(200).send("BADPW")
            }
          })
        } else if (results.length < 1) {
          res.status(200).send("UnknownUser")
        }
      }
    )
  },

  addingFirstDaocAccount: (req, res, next) => {
    const connection = req.app.get("connection")
    const { username, daocaccount } = req.body

    connection.query(
      `UPDATE webusers set daocaccount = JSON_MERGE ( daocaccount, '["${daocaccount}"]') where username = '${username}'`
    )
  },

  accountVerifySearch: (req, res, next) => {
    const connection = req.app.get("connection")
    const { daocaccountname } = req.body

    connection.query(
      `SELECT * FROM account WHERE Name = '${daocaccountname}'`,
      function(error, results, fields) {
        if (error) {
          console.log(error)
        } else if (results.length > 0) {
          connection.query(
            `SELECT Name FROM dolcharacters WHERE AccountName = '${daocaccountname}'`,
            function(error, results, fields) {
              if (error) {
                console.log(error)
              } else if (results.length > 0) {
                return res.status(200).send(results)
              } else if (results.length < 1) {
                return res.status(200).send("No Characters")
              }
            }
          )
        } else if (results.length < 1) {
          return res.status(200).send("UnknownUser")
        }
      }
    )
  },

  getUserInfo: (req, res, next) => {
    const connection = req.app.get("connection")
    const { username } = req.body

    connection.query(
      `SELECT * FROM webusers where username = '${username}'`,
      function(error, results, fields) {
        if (error) {
          console.log(error)
        } else return console.log(results) & res.status(200).send(results)
        c
      }
    )
  },

  getItemModelList: (req, res, next) => {
    const axios = req.app.get("axios")
    var fs = require("./items.json")
    res.status(200).send(fs)
  },
  getMobModelList: (req, res, next) => {
    const axios = req.app.get("axios")
    var fs = require("./mobs.json")
    res.status(200).send(fs)
  }, 
  getCharacterList: (req, res, next) => {
    const connection = req.app.get("connection")
    const { account } = req.body
    console.log(account)

    connection.query(
      `SELECT * FROM dolcharacters where AccountName = '${account}'`,
      function(error, results, fields) {
        if (error) {
          console.log(error)
        } else return console.log(results) & res.status(200).send(results)
        
      }
    )
  },
  inspectCharacter: (req, res, next) => {
    const connection = req.app.get("connection")
    const {DOLCharacters_ID} = req.body

    connection.query(
      `select * from itemunique iu
      where iu.Id_nb in (select UTemplate_ID from inventory where OwnerID = '${DOLCharacters_ID}');`,
      function(error, results, fields) {
        if (error) {
          console.log(error)
        } else return console.log(results) & res.status(200).send("here's 1", results)
        
      }
      `select it.* from itemtemplate it
      where it.Id_nb in (select ITemplate_Id from inventory where OwnerID = '${DOLCharacters_ID}');`,
      function(error, results, fields) {
        if (error) {
          console.log(error)
        } else return console.log(results) & res.status(200).send("here's 2", results)
        
      }
    )
  }
}
