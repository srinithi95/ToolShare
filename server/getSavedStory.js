const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const getSavedStory = (req, res) => {
    
    let userId = req.body.saveData.userId;
    console.log("get saved story server, userId is", userId);
    
    let query = `select s.*,si.image_url from story s, user_saved_story u, story_images si where u.user_id=? and s.story_id=u.story_id && s.story_id = si.story_id;`;
    con.query(query, [userId], (error, result, field) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getSavedStory;