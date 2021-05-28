const db=require('./db.js')


const getUserStory = (req, res) => {
    console.log("get user story server");

    let userId = req.body.saveData.userId;
    console.log("is",userId)
    console.log("test")
    
    let query = `select s.*  from story s where user_id=? `;
    db.con.query(query, [userId], (error, result, field) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getUserStory;