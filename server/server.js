const express = require("express");
const app = express();
const postStory = require("./postStory.js");
const registerUser = require("./registerUser.js");
const postTool = require("./postTool");
const Login = require("./Login.js");
const getStory = require("./getStory.js");
const getTool = require("./getTool.js");
const searchStory = require("./searchStory.js");
const searchTool = require("./searchTool.js");
const addSteps = require("./addSteps.js");
const getSteps = require("./getSteps.js");
const saveStory = require("./saveStory.js");
const getSavedStory = require("./getSavedStory.js");
const getUserStory = require("./getUserStory");
const updateStory = require("./updateStory");
const userToolDetails = require("./userToolDetails");
app.use(express.json());
const multer = require("multer");
const multer1 = require("multer");
const mysql = require ('mysql');
const db=require('./db.js')
const toolReservation = require("./toolreservation");
const getReservations = require("./getReservations");
const getToolReservationDates = require("./getToolReservationDates");
const getToolOwner = require("./getToolOwner");
const postReview = require("./postReview");

//main - do not tinker
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../public/images/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

//experimental
var storage1 = multer1.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../public/tool-images/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

app.post("/api/postreview", postReview);

app.post("/api/gettoolowner", getToolOwner);

// to search a specific tool by a specific user
app.post("/api/usertooldetails", userToolDetails);

//updatestory 
app.post("/api/updatestory", updateStory);

//get user specific story
app.post("/api/getuserstory", getUserStory)

//getting savedstory
app.post("/api/getsavedstory", getSavedStory)

//savestory endpoint
app.post("/api/saveStory", saveStory);

//get steps endpoint
app.post("/api/getsteps", getSteps);

//add step endpoint
app.post("/api/addsteps", addSteps);

//submit story endpoint
app.post("/api/postStory", postStory);

//for story image
app.post("/api/postStoryImage", upload.single("image-file"), function(req, res, next) {
  console.log("in server poststoryimage");
  var fileName=req.file.originalname;
  var storyId = req.body.storyIdInput;
  console.log(storyId);

  

  let newPath = "../images/" + fileName;
  console.log("new path is", newPath);

  let query = `insert into story_images (story_id, image_url) values (?, ?);`

  // ..\src\images\wwww.png - coming from multer
  // ../images/wwww.png - need to store in db

  db.con.query(query,[storyId, newPath], (error, result) => {
    console.log(error);
  });

  // res.send(`You have uploaded this image: <a href="./stepsupload">Upload another image</a>`);
});

//experimental store tools
app.post("/api/postToolImage", upload.single("image-file"), function(req, res, next) {
  console.log("in server postToolimage");
  console.log("body is:", req.body.toolId);
  var fileName=req.file.originalname;
  console.log("tool file is",fileName);
  var toolId = req.body.toolIdInput;
  console.log("tool id is:",toolId)

  
  let newPath = "../images/" + fileName;
  console.log("new path is", newPath);
  let query = `insert into tool_images (tool_id, image_url) values (?, ?);`

  db.con.query(query,[toolId, newPath], (error, result) => {
    console.log(error);
  });

  // res.send(`ok`);
});


//for steps images
app.post("/api/postStepsImage", upload.single("step-image"), function (req, res, next){
  console.log("postStepImage endpoint hit");
  console.log("files are:", req.file);

  var fileName=req.file.originalname;
  var stepNumber = req.body.stepNumber;
  var stepTitle = req.body.stepTitle;
  var stepDescription = req.body.stepDescription;

  console.log("----------", fileName, stepNumber, stepTitle, stepDescription);

  // var storyId 
  /*

  const con = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
  }) */

  // res.send(`You have uploaded this image: <a href="./stepsupload">Upload another step</a>`);
})

//register user endpoint
app.post("/api/registerUser", registerUser);

//auth service
app.post("/api/auth", Login);

app.post("/api/postTool", postTool);

app.get("/api/getStory", getStory);

app.get("/api/getTool", getTool);

app.post("/api/searchStory", searchStory);

app.post("/api/searchTool", searchTool);

//tool reservation
app.post("/api/reserveTool", toolReservation);

app.post("/api/getReservations", getReservations);

app.post("/api/gettoolreservationdates", getToolReservationDates);

// app.get("/", (req, res) => {
//   if (res.status(200)) {
//     res.send("Welcome to NauJavano");
//   } else if (res.status(404)) {
//     res.send({
//       status: "Error",
//       message: "Please enter a valid endpoint"
//     });
//   }
// });

// app.get("/*", (req, res) => {
//   if (res.status(404)) {
//     res.send({
//       status: "Error",
//       message: "Please enter a valid endpoint"
//     });
//   }
// });

app.listen(8080,()=>console.log("App Running on Port 8080"));
