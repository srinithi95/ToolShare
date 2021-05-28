const db=require('./db.js')




const searchTool = (req, res) => {
    console.log("search tool server");
    console.log(req.body)

    let searchTerm = "%" +req.body.searchData.searchTool + "%";
    let searchCity = req.body.searchData.searchToolCity;
    console.log("searchTerm is ", searchTerm);

    if(searchCity === "" || searchCity==undefined){

        let query = `select t.tool_id, t.tool_name, t.price, t.description, t.make, t.model_name,
        t.suggested_project, t.tool_condition, ti.image_url, tcd.contact_name, tcd.email, tcd.address, 
        tcd.city, tcd.state,
         tcd.zipcode, tcd.contact_number from tool t, tool_images ti, 
         tool_contact_details tcd where t.tool_id=ti.tool_id && 
         t.tool_id=tcd.tool_id 
        and t.tool_name LIKE ?  ;`
        db.con.query(query, [searchTerm, searchTerm], (error, result) => {
            if(error)
                console.log(error)
            else{
                //console.log(result)
                res.send(result)
            }       
        })
    }
        
    else{
        console.log("I am in else")
        // let query = `select t.*, ti.image_url from tool t, tool_images ti where tool_name LIKE ? OR contact_name LIKE ? && t.city=? && t.tool_id=ti.tool_id;`
        let query = `select t.* from tool t where tool_name LIKE ? OR contact_name LIKE ? && t.city=?;`
        db.con.query(query, [searchTerm, searchTerm, searchCity], (error, result) => {
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