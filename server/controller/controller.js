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

    connection.query(`SELECT dc.Name as PlayerName, tp.Name as ItemName, nv.Count  from inventory nv
JOIN itemtemplate tp ON nv.ITemplate_Id = tp.Id_nb
JOIN dolcharacters dc ON dc.DOLCharacters_id = nv.OwnerID
WHERE dc.Name LIKE '%${search}%' ORDER BY dc.Name asc, tp.Name LIMIT 300`, function (error, results, fields) {
    if (error) throw error;

   return res.status(200).send(results)
  })
},




}