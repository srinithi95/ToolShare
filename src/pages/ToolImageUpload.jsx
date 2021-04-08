import React from "react";
import { connect } from "react-redux";

const ToolImageUpload = ({toolId}) => {
  const handleSubmitImage = e => {
    console.log("inside handlesubmit image", e);
    console.log(e);
    alert("image uploaded");
  };

  return (
    <div className="container">
      Upload an image for your tool
      <div>
        <form
          id="image_upload_form"
          action="/api/postToolImage"
          method="post"
          enctype="multipart/form-data"
          onSubmit={handleSubmitImage}
        >
          <input type="file" name="image-file" />
          <input type="text" name="toolIdInput" id="storyText" value={toolId}/> 
          <input type="submit" value="Submit image" />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  toolId: state.shareYourToolReducer.toolId
});

export default connect(mapStateToProps)(ToolImageUpload);
