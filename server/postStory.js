const db=require('./db.js')

const multer = require('multer');
//const upload = multer({dest: '/server/uploads'});

const postStory = (req, res) => {
    // con.connect(function(err){
    //     if(err) throw err;
    //     console.log("Connected !!")
    // });

    console.log("poststory server, storyData is", req.body.storyData);
    
    console.log(req.body.storyData.image_url)
    
    let postingTitle = req.body.storyData.postingTitle;
    let description = req.body.storyData.description;
    let tools = req.body.storyData.tools;
    let category=req.body.storyData.storyCategory;
    let challengingLevel = req.body.storyData.challengingLevel;
    let storysteps=req.body.storyData.storysteps;
    let storyImages=req.body.storyData.storyImages;
    let image_url=req.body.storyData.image_url;
    let mainImageURL=req.body.storyData.mainImageURL;
    let userId = req.body.storyData.userId; 
    console.log(req.body.storyData.mainImageURL)

    let id = Date.now();
    console.log(tools.length)
    console.log(storysteps[1])

     let query = `insert into story (story_id, user_id, description,
        posting_title,challenging_level,story_image_url )
      values (?, ?, ?, ?, ?,?);`
     db.con.query(query,[id, userId, description, postingTitle,challengingLevel,mainImageURL],
         (error, result) => {
        console.log(error);
        //res.send({successful:true, story_id: id});
     });

     let query1=`insert into story_tools (story_id,tool_name) values (?,?);`

     for(var i=1;i<tools.length;i++){
        db.con.query(query1,[id, tools[i]], (error, result) => {
            console.log(error);
            //res.send({successful:true, story_id: id});
         });

     }

     let query2=`insert into story_steps(step_description,story_id,step_image_url) values (?,?,?)`
     for(var j=1;j<storysteps.length;j++){
        db.con.query(query2,[storysteps[j],id, image_url[j]], (error, result) => {
            console.log(error);
            
         });
     }
     let category1 = category[0];
    let category2 = category[1];
    let category3 = category[2];

    let query3 = `insert into story_category (story_id, category1, category2, category3) values (?, ?, ?, ?);`
    db.con.query(query3, [id, category1, category2, category3], (error, result) => {
        console.log(error);
    });
    
   
    res.send({successful:true, story_id: id});
}

module.exports = postStory;