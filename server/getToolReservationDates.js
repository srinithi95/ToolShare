const db=require('./db.js')



const getToolReservationDates = (req, res) => {
    console.log("get tool reservation date server");
    let toolId = req.body.toolData.toolId;

    let query = `select start_date from tool_reservation where tool_id=?`;
    db.con.query(query, [toolId],(error, result) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getToolReservationDates;