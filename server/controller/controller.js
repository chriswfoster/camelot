module.exports = {

mobFinder: (req, res, next) => {
    const connection = req.app.get("connection")
    const {search} = req.body

    connection.query(`SELECT DISTINCT Name, Level FROM mob WHERE Name LIKE '%${search}%' ORDER BY Name LIMIT 100`, function (error, results, fields) {
        if (error) throw error;

       return res.status(200).send(results)
      })

}




}