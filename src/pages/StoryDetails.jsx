import React from "react";
import axios from "axios";
import "./storydetails.css";
import ReactImageMagnify from "react-image-magnify";
import ReactDOM from "react-dom";
import LandingPage from './LandingPage'
import App from '../App'
import Carousel from './Carousel.js'

const StoryDetails = (propStory) => {
  console.log("in story details component", propStory);
  const [stepArray, setStepArray] = React.useState([]);
  const handleOnclick = () => {
    console.log("in handle register");
    ReactDOM.render(<LandingPage />, document.getElementById('xyz'));
  }
  

  React.useEffect(() => {
    const storyId = {
      story_id: propStory.story.story_id,
    };

    axios
      .post("/api/getsteps", { storyId })
      .then((response) => {
        console.log(response.data);
        setStepArray(response.data);
      });
  }, []);

  return (
    <div className="story-wrapper">
      <div>
        <b>{propStory.story.posting_title}</b>
      </div>
      <div>
        <i>{propStory.story.description}</i>
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
      <div>
        <ol>
          {stepArray.map((s) => (
            <div className="">
              <div className="">
                <li>{s.text}</li>
              </div>
            </div>
          ))}
        </ol>
      </div>
      {/* <div>
        <img src={propStory.story.image_url} className="imageframe" />
      </div> */}
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

      </div>
      {/*
      <button className="button" onClick={handleOnclick} > Back </button> */}
    </div>
  );
};

export default StoryDetails;
