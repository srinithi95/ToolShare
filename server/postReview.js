const mysql = require ('mysql');
const multer = require('multer');
//const upload = multer({dest: '/server/uploads'});

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const postReview = (req, res) => {
    console.log("postreview server, storyData is", req.body.reviewData);
    let borrowerId = req.body.reviewData.userId;
    let ownerId = req.body.reviewData.ownerId;
    let reviewText = req.body.reviewData.review_text;
    let reviewPoint = req.body.reviewData.review_point;

    let query = `insert into review (borrower_id, owner_id, review_text, review_point) values (?, ?, ?, ?);`
    con.query(query,[borrowerId, ownerId, reviewText, reviewPoint], (error, result) => {
        if(error)
            console.log(error);
        else
            res.send({successful:true});
    });
    
}

module.exports = postReview;