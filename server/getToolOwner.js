const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const getToolOwner = (req, res) => {
    console.log("get tool owner server");
    
    let searchTerm = req.body.tool_id;
    console.log(searchTerm);

    // let query = `select u.first_name, s.*, si.image_url from users u,story s, story_images si where u.users_id=s.user_id && s.story_id=si.story_id order by s.story_id desc`;
    let query = `select user_id from tool where tool_id=?;`
    // select s.*,si.image_url  from story s, story_images si where user_id=? && s.story_id=si.story_id
    con.query(query, [searchTerm], (error, result) => {
        if(error)
            console.log(error)
        else{
            console.log(result)
            res.send(result)
        }       
    })
}

module.exports = getToolOwner;