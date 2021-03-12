const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const toolReservation = (req, res) => {
    console.log("in tool reservation server, data is", req.body.reservationData);
    let userId = req.body.reservationData.userId;
    let toolId = req.body.reservationData.toolId;
    let startDate = req.body.reservationData.startDateInCalendar;
    let endDate = req.body.reservationData.endDateInCalendar;

    let query = `insert into tool_reservation (user_id, tool_id, start_date, end_date) values (?, ?, ?, ?);`
    con.query(query, [userId, toolId, startDate, endDate]);

    res.send({successful:true});
}

module.exports = toolReservation;