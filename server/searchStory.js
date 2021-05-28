const db=require('./db.js')



const searchStory = (req, res) => {
    // con.connect(function(err){
    //     if(err) throw err;
    //     console.log("Connected !!")
    // });

    console.log("search story server");

    let searchTerm = "%" +req.body.searchData.searchStory + "%";
    console.log("searchTerm is ", searchTerm);

//     SELECT * FROM Customers
// WHERE CustomerName LIKE 'a%' OR ContactName LIKE 'a%';
    let query = `select * from story where posting_title LIKE ? ;`

    db.con.query(query, [searchTerm, searchTerm], (error, result) => {
        if(error)
            console.log(error)
        else{
            console.log(result)
            res.send(result)
        }
            
    })
}

module.exports = searchStory;