const multer = require('multer');
const db=require('./db.js')

//const upload = multer({dest: '/server/uploads'});



const postReview = (req, res) => {
    console.log("postreview server, storyData is", req.body.reviewData);
    let borrowerId = req.body.reviewData.userId;
    let ownerId = req.body.reviewData.ownerId;
    let reviewText = req.body.reviewData.review_text;
    let reviewPoint = req.body.reviewData.review_point;

    let query = `insert into review (borrower_id, owner_id, review_text, review_point) values (?, ?, ?, ?);`
    db.con.query(query,[borrowerId, ownerId, reviewText, reviewPoint], (error, result) => {
        if(error)
            console.log(error);
        else
            res.send({successful:true});
    });
    
}

module.exports = postReview;