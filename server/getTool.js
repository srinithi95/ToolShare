const db=require('./db.js')
const getTool = (req, res) => {
    console.log("get tool server");
    
    let query = `select t.tool_id, t.tool_name, t.price, t.description, t.make, t.model_name,
    t.suggested_project, t.tool_condition, ti.image_url, tcd.contact_name, tcd.email, tcd.address, 
    tcd.city, tcd.state,
     tcd.zipcode, tcd.contact_number from tool t, tool_images ti, 
     tool_contact_details tcd where t.tool_id=ti.tool_id && 
     t.tool_id=tcd.tool_id`;
    db.con.query(query, (error, result) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getTool;