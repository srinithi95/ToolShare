const db=require('./db.js')


const getSteps = (req, res) => {
    console.log("get steps server", req.body);

    let story_id = req.body.storyId.story_id
    
    let query = `select text from story_steps where story_id = ?`;
    db.concon.query(query, [story_id], (error, result, field) => {
        if(error)
            console.log(error)
        else{
            console.log("result is", result);
            res.send(result);
        }
    });
}

module.exports = getSteps;