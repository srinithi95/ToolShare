const db=require('./db.js')




const updateStory = (req, res) => {
    console.log("updateStory server, storyData is", req.body.storyData);
    let postingTitle = req.body.storyData.postingTitle;
    let description = req.body.storyData.description;
    let tools = req.body.storyData.tools;
    let materials = req.body.storyData.material;
    let category = req.body.storyData.category;
    let tag = req.body.storyData.tag;
    let storyId = req.body.storyData.id;

    // update story set description='xy', tool='xy', material='xy', category='xy', tag='xy', posting_title='xy' where story_id='1585530807285';
    let query = `update story set description=?, tool=?, material=?, category=?, tag=?, posting_title=? where story_id=?;`
    db.con.query(query,[description, tools, materials, category, tag, postingTitle, storyId], (error, result) => {
        console.log(error);
        res.send({successful:true});
    });
}

module.exports = updateStory;