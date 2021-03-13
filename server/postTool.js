const db=require('./db.js')




const postTool = (req, res) => {
    // con.connect(function(err){
    //     if(err) throw err;
    //     console.log("Connected !!")
    // });

    let toolName = req.body.toolData.toolName;
    let price = req.body.toolData.price;
    let availability = req.body.toolData.availability;
    let description = req.body.toolData.description;

    let make = req.body.toolData.make;
    let condition = req.body.toolData.condition;
    let modelName = req.body.toolData.modelName;
    let suggestedProject = req.body.toolData.suggestedProject;

    let email = req.body.toolData.email;
    let contactNumber = req.body.toolData.contactNumber;
    let contactName = req.body.toolData.contactName;
    let address = req.body.toolData.address;
    let city = req.body.toolData.city;
    let state = req.body.toolData.state;
    let zipcode = req.body.toolData.zipcode;
    let userId = req.body.toolData.userId;

    let id = Date.now();

    let query = `insert into tool (tool_id, user_id, tool_name, price, description, make, model_name, suggested_project, tool_condition) values (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    db.con.query(query, [id, userId, toolName, price, description, make, modelName, suggestedProject, condition])
    console.log("in post tool", req.body.toolData);

    let query1 = `insert into tool_contact_details (tool_id, contact_name, email, address, city, state, zipcode, contact_number) values (?, ?, ?, ?, ?, ?, ?, ?);`
    db.con.query(query1, [id,contactName, email, address, city, state, zipcode, contactNumber]);
    // , email, contact_number, contact_name, address, city, state, zipcode,
    // email, contactNumber, contactName, address, city, state, zipcode, 
    res.send({successful:true, tool_id: id});
}

module.exports = postTool;