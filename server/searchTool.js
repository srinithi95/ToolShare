const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const searchTool = (req, res) => {
    console.log("search tool server");

    let searchTerm = req.body.searchData.searchTool + "%";
    let searchCity = req.body.searchData.searchToolCity;
    console.log("searchTerm is ", searchTerm);

    if(searchCity === ""){
        let query = `select t.*, ti.image_url from tool t, tool_images ti where tool_name LIKE ? OR contact_name LIKE ? && t.tool_id=ti.tool_id;`
        con.query(query, [searchTerm, searchTerm], (error, result) => {
            if(error)
                console.log(error)
            else{
                console.log(result)
                res.send(result)
            }       
        })
    }
        
    else{
        // let query = `select t.*, ti.image_url from tool t, tool_images ti where tool_name LIKE ? OR contact_name LIKE ? && t.city=? && t.tool_id=ti.tool_id;`
        let query = `select t.* from tool t where tool_name LIKE ? OR contact_name LIKE ? && t.city=?;`
        con.query(query, [searchTerm, searchTerm, searchCity], (error, result) => {
            if(error)
                console.log(error)
            else{
                console.log(result)
                res.send(result)
            }       
        })
    }
        
    
}

module.exports = searchTool;