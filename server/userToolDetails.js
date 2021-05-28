const db=require('./db.js')



const userToolDetails = (req, res) => {
    console.log("user tool details server");

    let toolName = req.body.data.toolName;
    let userId = req.body.data.userId;
    console.log("----------", toolName, userId);

    let query = `select t.tool_id, t.tool_name, t.price, t.description, t.make, t.model_name,
    t.suggested_project, t.tool_condition, ti.image_url, tcd.contact_name, tcd.email, tcd.address, 
    tcd.city, tcd.state,
     tcd.zipcode, tcd.contact_number from tool t, tool_images ti, 
     tool_contact_details tcd where t.tool_id=ti.tool_id && 
     t.tool_id=tcd.tool_id and tool_name=?;`
    db.con.query(query, [toolName], (error, result) => {
        if(error)
            console.log(error)
        else{
            console.log(result)
            res.send(result)
        }       
    })
}

module.exports = userToolDetails;