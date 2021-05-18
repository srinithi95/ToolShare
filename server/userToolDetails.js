const db=require('./db.js')



const userToolDetails = (req, res) => {
    console.log("user tool details server");

    let toolName = req.body.data.toolName;
    let userId = req.body.data.userId;
    console.log("----------", toolName, userId);

    let query = `select t.*, ti.image_url from tool t, tool_images ti where t.tool_id=ti.tool_id and tool_name=?;`
    db.con.query(query, [toolName, userId], (error, result) => {
        if(error)
            console.log(error)
        else{
            console.log(result)
            res.send(result)
        }       
    })
}

module.exports = userToolDetails;