const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const addSteps = (req, res) => {
    console.log("add step server, step is", req.body.stepData);
    let stepText = req.body.stepData.stepText;
    let storyId = req.body.stepData.storyId;
    
    let query = `insert into story_steps (text, story_id) values (?, ?);`
    con.query(query,[stepText, storyId]);

    let query1 = `select text from story_steps where story_id = ?;`
    con.query(query1,[storyId],(error, result) => {
        res.send({successful: true, result: result});
    });
    // res.send("step added");
}

module.exports = addSteps;