const db=require('./db.js')




const saveStory = (req, res) => {
    console.log("savestory server, storyData is", req.body.saveData);
    let storyId = req.body.saveData.storyId;
    let userId = req.body.saveData.userId;

    let query = `insert into user_saved_story (user_id, story_id) values (?, ?);`
    db.con.query(query,[userId, storyId], (error, result) => {
        console.log(error);
        res.send({successful:true});
    });
}

module.exports = saveStory;