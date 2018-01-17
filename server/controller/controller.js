module.exports = {

mobFinder: (req, res, next) => {
    const connection = req.app.get("connection")
    const {search} = req.body

    connection.query(`SELECT DISTINCT Name, Level FROM mob WHERE Name LIKE '%${search}%' ORDER BY Name LIMIT 100`, function (error, results, fields) {
        if (error) throw error;

       return res.status(200).send(results)
      })
},

searchPlayersInventory: (req, res, next) => {
    const connection = req.app.get("connection")
    const {search} = req.body

    connection.query(`SELECT dc.Name as PlayerName, tp.Name as ItemName, nv.Count  from inventory nv JOIN itemtemplate tp ON nv.ITemplate_Id = tp.Id_nb JOIN dolcharacters dc ON dc.DOLCharacters_id = nv.OwnerID WHERE dc.Name LIKE '%${search}%' ORDER BY dc.Name asc, tp.Name LIMIT 300`, function (error, results, fields) {
    if (error) throw error;

   return res.status(200).send(results)
  })
},

getNewsFeed: (req, res, next) => {
    const connection = req.app.get("connection")
    const {search} = req.body

    connection.query(`SELECT * FROM newsfeed ORDER BY post_id DESC`, function (error, results, fields) {
    if (error) throw error;

   return res.status(200).send(results)
  })
},

registerUser: (req, res, next) => {
    const connection = req.app.get("connection")
    const bcrypt = req.app.get("bcrypt")
    const {username, password} = req.body
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          connection.query(`insert into webusers(username, password) values('${username}', '${hash}');`, function (error, results, fields) {
            if (error){
                if (error.code === 'ER_DUP_ENTRY'){
                return res.status(200).send({status: "ALREADY EXISTS"})
            } else console.log (error) 
            return res.status(500).send()} else if (results.affectedRows > 0) {

                connection.query(`SELECT * FROM webusers WHERE username = '${username}'`, function (error, results, fields) {
                    if (error){ 
                        console.log(error)
                        res.status(200).send({status: 'Broke'})} else
                        console.log(results)
                        return res.status(200).send(results)
                  })
            }
      
          })
          })
      })
},
loginUser: (req, res, next) => {

},


}