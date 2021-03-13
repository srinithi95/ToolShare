const db=require('./db.js')

const multer = require('multer');
//const upload = multer({dest: '/server/uploads'});



const postStory = (req, res) => {
    // con.connect(function(err){
    //     if(err) throw err;
    //     console.log("Connected !!")
    // });

    console.log("poststory server, storyData is", req.body.storyData);
    let postingTitle = req.body.storyData.postingTitle;
    let description = req.body.storyData.description;
    let tools = req.body.storyData.tools;
    let materials = req.body.storyData.materials;
    let category = req.body.storyData.category;
    let tag = req.body.storyData.tag;
    let userId = req.body.storyData.userId;

    let id = Date.now();

    console.log("tools:", tools);
    console.log("material:", materials);
    console.log("category:", category);

    // let query = `insert into story (story_id, user_id, description, tool, material, category, tag, posting_title) values (?, ?, ?, ?, ?, ?, ?, ?);`
    // con.query(query,[id, userId, description, tools, materials, category, tag, postingTitle], (error, result) => {
    //     console.log(error);
    //     res.send({successful:true, story_id: id});
    // });
    let tool23="";
    let material23="";
    let category23="";
    let tag23="";

    let query = `insert into story (story_id, user_id, description, posting_title) values (?, ?, ?, ?);`
    db.con.query(query,[id, userId, description, postingTitle], (error, result) => {
        console.log(error);
    });

    let tool1 = tools[0];
    let tool2 = tools[1];
    let tool3 = tools[2];
    let tool4 = tools[3];
    let tool5 = tools[4];

    let query1 = `insert into story_tools (story_id, tool1, tool2, tool3, tool4, tool5) values (?, ?, ?, ?, ?, ?);` 
    db.con.query(query1, [id, tool1, tool2, tool3, tool4, tool5], (error, result) => {
        console.log(error);
    });

    let material1 = materials[0];
    let material2 = materials[1];
    let material3 = materials[2];
    let material4 = materials[3];
    let material5 = materials[4];

    let query2 = `insert into story_materials (story_id, material1, material2, material3, material4, material5) values (?, ?, ?, ?, ?, ?);`
    db.con.query(query2, [id, material1, material2, material3, material4, material5], (error, result) => {
        console.log(error);
    });

    let category1 = category[0];
    let category2 = category[1];
    let category3 = category[2];

    let query3 = `insert into story_category (story_id, category1, category2, category3) values (?, ?, ?, ?);`
    db.con.query(query3, [id, category1, category2, category3], (error, result) => {
        console.log(error);
    });

    let tag1 = tag[0];
    let tag2 = tag[1];
    let tag3 = tag[2];

    let query4 = `insert into story_tag (story_id, tag1, tag2, tag3) values (?, ?, ?, ?);`
    db.con.query(query4, [id, tag1, tag2, tag3], (error, result) => {
        console.log(error);
    });

    res.send({successful:true, story_id: id});
}

module.exports = postStory;