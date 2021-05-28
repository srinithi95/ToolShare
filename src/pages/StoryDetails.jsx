import React from "react";
import axios from "axios";
import "./storydetails.css";
import UserToolDetails from "./UserToolDetails";
import ReactDOM from "react-dom";
import ReactImageMagnify from "react-image-magnify";

const StoryDetails = (propStory,store,userId) => {
  const [storyDetails,setStoryDetails]=React.useState()
  const [stepArray, setStepArray] = React.useState([]);
  const[toolArray,setToolArray]=React.useState([]);
  const[changeLayout, setChangeLayout]=React.useState(true)
  React.useEffect(() => {
    const storyId = {
      story_id: propStory.story.story_id,
    };
      axios.post("/api/getStoryToolDetails",{ storyId })
       .then((response) =>{
         console.log(response.data)
         setToolArray(response.data) 
       })
      
       axios.post("/api/getStoryStepDetails",{ storyId })
         .then((response)=>{
          setStepArray(response.data)
          console.log(response.data)
         })

  }, []);
  const handleToolOnClick =(tool) =>{
    ReactDOM.render(
      <UserToolDetails tool={tool} />,
      document.getElementById("xyz")
    );
  }
  const changeLayoutOnClick =() =>{
    if(changeLayout==true){
      setChangeLayout(false)
    }
    else{
      setChangeLayout(true)
    }
    
  }
  

  return (
    <div className="story-wrapper">
      <div>
        <b>{propStory.story.posting_title}</b>
      </div>
      <button className="submit-style-new" onClick={changeLayoutOnClick} > Change Layout</button>
      
      <div>
        <i>{propStory.story.description}</i>
      </div>
  <div><b><u>Challenging Level:</u></b> {propStory.story.challenging_level}</div>
      <br/>
      <div>
        <img src={propStory.story.story_image_url} width="300"></img>
      </div>
      <div className="story-inside-wrapper">
        {/* <span className="margin-20px width-100px">Tools required:</span>
        <span className="margin-20px width-100px">{propStory.story.tool}</span> */}
      </div>
      <div>
        {/* <span className="margin-20px width-100px">Materials:</span>
        <span className="margin-20px width-100px">
          {propStory.story.material}
        </span> */}
      </div>
      <div>
        {/* <strong>The steps of the story are:</strong> */}
      </div>
      <br/>
      <div>Tools Used</div>
      <div>
      <ol>
          {toolArray.map((t) => (
            <div className="">
              <div className="">
                <li> <span
                            id="toolspan"
                            onClick={() => handleToolOnClick(t.tool_name)}
                            className="margin-right-10px"
                          >
                            {t.tool_name}
                          </span>
                  </li>
              </div>
            </div>
          ))}
        </ol>
        
      </div>
      <div>Story Steps</div>
      <div>
      
          { changeLayout && (stepArray.map((sp) => (
            <div className="">
              <div className="">
                <div >{sp.step_description}</div>
                <img src={sp.step_image_url}></img>
                
              </div>
              <br/>
            </div>
          )))}
          <ol>
          { !changeLayout && (stepArray.map((sp) => (
            <div className="">
              <div className="ordered-display">
                <li>
                <div className="step-description">{sp.step_description}</div>
                </li>
                <img  src={sp.step_image_url} ></img>
               
                
              </div>
              <br/>
            </div>
          )))}
          </ol>


        
      

        
      </div>
      {/* <div>
        <img src={propStory.story.image_url} className="imageframe" />
      </div> */}
      {/*
      <div className="fluid">
        <div className="fluid__image-container">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: propStory.story.image_url,
                width: 300,
                height: 300
              },
              largeImage: {
                src: propStory.story.image_url,
                width: 600,
                height: 800,
              },
              isHintEnabled: true,
              shouldHideHintAfterFirstActivation: false,
            }}
          />
        </div>
          </div> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  userId: state.userReducer.userId,

});

export default StoryDetails;
