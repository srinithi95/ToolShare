import React from "react";
import "./shareyourstory.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Multiselect } from 'multiselect-react-dropdown';

const ShareYourStory = ({ dispatch, userId }) => {
 
  const [postingTitle, setPostingTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tools, setTools]= React.useState([]);
  const[storyMainImage,setStoryMainImage]=React.useState(null);
  const[storyImages,setStoryImages]=React.useState([])
  const[challengingLevel,setChallengingLevel]=React.useState("")
  var [toolCount, setToolCount] = React.useState(1);
  var [image, setImage] = React.useState(null)
  var[storysteps, setStorySteps]= React.useState([])
  var[storyCount,setStoryCount]=React.useState(1)
  var[storyCategory,setStoryCategory]= React.useState([]);

  const CategoryOptions = ["Living Room","Bed Room","Bath Room","Laundry Room","Garden","Car or Bike"]

 const options = [
    'Easy', 'Medium', 'Hard'
  ];

  const handlePost = () => {
      
      var FormData=require('form-data')
      var form =new FormData();
      var image_url=[null]
      var mainImageURL="../images/" +storyMainImage.name
      form.append("file",storyMainImage)
      for(var i=1;i<storyImages.length;i++){
        form.append("file",storyImages[i])
        var url="../images/" + storyImages[i].name
        image_url.push(url)
        
      }

      
      const storyData = {
        postingTitle,
        description,
        tools,
        challengingLevel,
        storysteps,
        image_url,
        storyCategory,
        userId,
        mainImageURL
      
      };
      
      axios
          .post("/api/uploadstepImages",form)
          .then((response =>{
              console.log(response)
            }
            ))
      
      axios
        .post("/api/postStory", { storyData })
        .then(response => {
          console.log(response);
          const res = response.data;
          console.log(res);
          
          if (res.successful) {
            console.log(res.story_id);
            //dispatch(setStoryId(res.story_id));
          console.log("new story id is", res.story_id);
          alert("Story uploaded");
         
          }
          else{
            alert("Please enter proper values");

          }
        });
    
  }; 
 
  const addTool = () => {  
    const maindiv = document.getElementById("Tool-div");
    const tempdiv = document.createElement("div");
    tempdiv.className = "width-200px";
    const tempinput = document.createElement("input");
    tempinput.addEventListener("change",updateTool)
    tempinput.name=toolCount
    tempdiv.appendChild(tempinput);
    maindiv.appendChild(tempdiv);
    toolCount = toolCount + 1;
    setToolCount(toolCount);
  } 

const upbutton = (event) =>
{ 
 var currentId=event.target.name
 var valOne=storysteps[currentId-1]
 var valTwo=storysteps[currentId]
 var imgOne=storyImages[currentId-1]
 var imgTwo=storyImages[currentId]
 var temp;
 var tempImg;
 if(event.target.name!=1)
 {
   temp=storysteps[currentId]
   storysteps[currentId]=storysteps[currentId-1]
   storysteps[currentId-1]=temp
   setStorySteps(storysteps)

   tempImg=storyImages[currentId]
   storyImages[currentId]=storyImages[currentId-1]
   storyImages[currentId-1]=tempImg
   setStoryImages(storyImages)
   const element1=document.getElementById(event.target.name)
   element1.value=valOne
   const element2=document.getElementById(event.target.name-1)
    element2.value=valTwo
   const imgelement=document.getElementById("tempdiv"+event.target.name)
   const imgelement2=document.getElementById("tempdiv"+(event.target.name-1))
   const childNode1=imgelement.childNodes[5]
   const childNodes2=imgelement2.childNodes[5]
   if(childNode1!=null){
    childNode1.src=URL.createObjectURL(imgOne)

   }
   if(childNodes2!=null){
    childNodes2.src=URL.createObjectURL(imgTwo)
   }
   
   

   
 }
}
const downbutton = (event) =>
{
  var currentId=event.target.name

  
  if(currentId!=(storysteps.length-1)){
      var valOne=storysteps[parseInt(currentId)+1]
      var valTwo=storysteps[currentId]
      var imgOne=storyImages[parseInt(currentId)+1]
      var imgTwo=storyImages[currentId]
      var temp;
      var tempImg;
      temp=storysteps[currentId]
      storysteps[currentId]=storysteps[currentId+1]
      storysteps[currentId+1]=temp
      setStorySteps(storysteps)
      tempImg=storyImages[currentId]
      storyImages[currentId]=storyImages[currentId+1]
      storyImages[currentId+1]=tempImg
      setStoryImages(storyImages)
      
      const element1=document.getElementById(event.target.name)
      element1.value=valOne
      const element2=document.getElementById(parseInt(currentId)+1)
      element2.value=valTwo
      const imgelement=document.getElementById("tempdiv"+event.target.name)
   const imgelement2=document.getElementById("tempdiv"+(parseInt(event.target.name)+1))
   const childNode1=imgelement.childNodes[5]
   const childNodes2=imgelement2.childNodes[5]
   childNode1.src=URL.createObjectURL(imgOne)
   childNodes2.src=URL.createObjectURL(imgTwo)

  }
}

const setImageUpload =(event) =>{
 storyImages[event.target.name] = event.target.files[0]
 setStoryImages(storyImages)

 const temp=document.getElementById("tempdiv"+event.target.name)
 const img=document.createElement("img")
 img.src=URL.createObjectURL(event.target.files[0])
 img.id = "image" + event.target.name
 console.log(img.id)
 temp.appendChild(img)

}
  
  const addSteps=()=>{
    
    const maindiv=document.getElementById("story-steps")
    const tempdiv=document.createElement("div");
    tempdiv.id="tempdiv"+storyCount
    const input=document.createElement("textarea");
    const newline=document.createElement("br")
    
    input.className="description-box";
    input.addEventListener("change",updateStep)
    input.name=storyCount
    input.id=storyCount
    console.log(input)
   
    const buttonup =document.createElement("button")
    buttonup.textContent=String.fromCharCode(8593)
    buttonup.name=storyCount
    buttonup.addEventListener("click",upbutton)

    const buttondown =document.createElement("button")
    buttondown.name=storyCount
    buttondown.textContent=String.fromCharCode(8595)
    buttondown.addEventListener("click",downbutton)

    const file=document.createElement("input")
    file.type="file"
    file.addEventListener("change",setImageUpload)
    file.name=storyCount
    file.id=storyCount

    tempdiv.appendChild(newline)
    tempdiv.appendChild(input)
    tempdiv.appendChild(buttonup)
    tempdiv.appendChild(buttondown)
    tempdiv.appendChild(file)
    maindiv.appendChild(tempdiv) 
    console.log(tempdiv)
    setStoryCount(storyCount+1)
    
  }

  const handleImage = (event) => {
  console.log(event.target.files[0])
  setImage(URL.createObjectURL(event.target.files[0]))

  }

  const updateStep =(event)=>{
    storysteps[event.target.name]=event.target.value
    setStorySteps(storysteps)
  }

  const updateTool = (event) => {
    tools[event.target.name]=event.target.value
    setTools(tools) 
    console.log(tools)
  }
  const uploadStoryImage =(event) =>{
    const maindiv=document.getElementById("story-image")
    const newline=document.createElement("br")
    const img=document.createElement("img")
    img.src=URL.createObjectURL(event.target.files[0])
    setStoryMainImage(event.target.files[0])
    maindiv.appendChild(newline)
    maindiv.appendChild(img)
  }

  return (
    <div className="wrapper container">
      <b className="align-left"> Post a Story </b>{" "}
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20">
        </div>
      </div>
      <Paper elevation={4}>
      <div className="inside-wrapper">
        <div className="width-200px"> <strong>Story Title </strong> <span className="red-text">*</span></div>
        <div>
          <input
            type="text"
            onChange={e => {
              setPostingTitle(e.target.value);
            }}
            size="40"
          />
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px"> <strong>Description </strong> <span className="red-text">*</span></div>
        <div>
          <textarea
            type="text"
            onChange={e => {
              setDescription(e.target.value);
            }}
            rows="5" cols="50"
          />
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px" id="story-image"> <strong>Story Image </strong> </div>
        <div>
          <input
            type="file"
            onChange={uploadStoryImage}
            rows="5" cols="50"
          />
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div className="width-200px"> <strong> &nbsp;   Which tools did you use? </strong></div>
      <div className="inside-wrapper" id="Tool-div">    
      </div>
      <div> <button className="green-text" onClick={addTool}> + Add Tool </button></div>
      <br/>
      <div> <strong>&nbsp; How challenging was it? </strong></div>  
      <div className="inside-wrapper" id="difficulty-level">   
      <Dropdown options={options} placeholder="Select Level" onChange={(event)=>{setChallengingLevel(event.value)}}/><br/>
      </div><br/>
      <div> &nbsp;<strong> Story steps </strong></div> 
      
     <div className="story-steps" id="story-steps" >  
     </div> <br/>
     <button className="green-text" onClick={addSteps}> + Add Steps </button><br/>
     <br/>
      <div> <strong> &nbsp; Select your story category</strong></div>
      <Multiselect 
         options={CategoryOptions} 
         isObject={false} 
         onSelect={(selectedList)=>{setStoryCategory(selectedList)}}
         onRemove={(selectedList)=>{setStoryCategory(selectedList)}
         }/>
    
      
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20"> {/* <b> Steps </b>{" "} */}</div>
      </div>
      <div className="align-centre1 inside-wrapper">
        <div>
          <button className="submit-style" onClick={handlePost}> Post </button>{" "}
        </div>
        
        <div>
          <Switch>
            <Route path="/imageupload" component={ImageUpload} />
          </Switch>
        </div>
      </div>
      </Paper>
    </div>
    
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  userId: state.userReducer.userId
});

export default connect(mapStateToProps)(ShareYourStory);