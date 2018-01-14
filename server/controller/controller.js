module.exports = {

heheh: (req, res, next) => {
    const connection = req.app.get("connection")
    connection.query("SELECT * from mob where Name = 'shark'", function (error, results, fields) {
    if (error) throw error;
   return res.status(200).send(results)
  })
}


}