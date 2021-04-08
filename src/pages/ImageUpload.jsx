import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const ImageUpload = ({storyId}) => {
  const handleSubmitImage = e => {
    console.log("inside handlesubmit image", e);
    console.log(e);
    alert("image uploaded");
  };

  return (
    <div className="container">
      Upload an image for your story
      <div>
        <form
          id="image_upload_form"
          action="/api/postStoryImage"
          method="post"
          enctype="multipart/form-data"
          onSubmit={handleSubmitImage}
        >
          <input type="file" name="image-file" />
          <input type="text" name="storyIdInput" id="storyText" value={storyId}/> 
          <input type="submit" value="Submit image" />
        </form>
      </div>
      {/* <NavLink id="nextdiv" to="/stepsupload" className="nav-bar-button">
        Go to steps
      </NavLink> */}
    </div>
  );
};

const mapStateToProps = state => ({
  storyId: state.shareYourStoryReducer.storyId
});

export default connect(mapStateToProps)(ImageUpload);
