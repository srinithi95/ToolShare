const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const getToolReservationDates = (req, res) => {
    console.log("get tool reservation date server");
    let toolId = req.body.toolData.toolId;

    let query = `select start_date from tool_reservation where tool_id=?`;
    con.query(query, [toolId],(error, result) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getToolReservationDates;