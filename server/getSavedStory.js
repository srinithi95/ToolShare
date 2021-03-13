const db=require('./db.js')

const getSavedStory = (req, res) => {
    
    let userId = req.body.saveData.userId;
    console.log("get saved story server, userId is", userId);
    
    let query = `select s.*,si.image_url from story s, user_saved_story u, story_images si where u.user_id=? and s.story_id=u.story_id && s.story_id = si.story_id;`;
    db.con.query(query, [userId], (error, result, field) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getSavedStory;