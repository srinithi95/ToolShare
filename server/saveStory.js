const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const saveStory = (req, res) => {
    console.log("savestory server, storyData is", req.body.saveData);
    let storyId = req.body.saveData.storyId;
    let userId = req.body.saveData.userId;

    let query = `insert into user_saved_story (user_id, story_id) values (?, ?);`
    con.query(query,[userId, storyId], (error, result) => {
        console.log(error);
        res.send({successful:true});
    });
}

module.exports = saveStory;