const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const getUserStory = (req, res) => {
    console.log("get user story server");

    let userId = req.body.saveData.userId;
    
    let query = `select s.*,si.image_url  from story s, story_images si where user_id=? && s.story_id=si.story_id`;
    con.query(query, [userId], (error, result, field) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getUserStory;