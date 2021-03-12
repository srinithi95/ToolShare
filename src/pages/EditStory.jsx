import React from "react";
import "./editstory.css";
import axios from "axios";

const EditStory = propStory => {
  const [postingTitleFocus, setPostingTitleFocus] = React.useState(false);
  const [descriptionFocus, setDescriptionFocus] = React.useState(false);
  const [toolsFocus, setToolsFocus] = React.useState(false);
  const [materialFocus, setMaterialFocus] = React.useState(false);
  const [categoryFocus, setCategoryFocus] = React.useState(false);
  const [tagFocus, setTagFocus] = React.useState(false);

  const [postingTitle, setPostingTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tools, setTools] = React.useState("");
  const [material, setMaterial] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [tag, setTag] = React.useState("");

  React.useEffect(() => {
    document.getElementById("inputPostingTitle").value =
      propStory.story.posting_title;
    document.getElementById("inputDescription").value =
      propStory.story.description;
    document.getElementById("inputTools").value = propStory.story.tool;
    document.getElementById("inputMaterial").value = propStory.story.material;
    document.getElementById("inputCategory").value = propStory.story.category;
    document.getElementById("inputTag").value = propStory.story.tag;
  }, []);

  const handleOnFocusPostingTitle = () => {
    console.log("Onfocus called");
    document.getElementById("inputPostingTitle").value = "";
    setPostingTitleFocus(true);
  };

  const handleOnFocusDescription = () => {
    document.getElementById("inputDescription").value = "";
    setDescriptionFocus(true);
  };

  const handleOnFocusTools = () => {
    document.getElementById("inputTools").value = "";
    setToolsFocus(true);
  };

  const handleOnFocusMaterial = () => {
    document.getElementById("inputMaterial").value = "";
    setMaterialFocus(true);
  };

  const handleOnFocusCategory = () => {
    document.getElementById("inputCategory").value = "";
    setCategoryFocus(true);
  };

  const handleOnFocusTag = () => {
    document.getElementById("inputTag").value = "";
    setTagFocus(true);
  };

  const handleSubmit = () => {
    
    const storyData = {
        id: propStory.story.story_id,
        postingTitle,
        description,
        tools,
        material,
        category,
        tag
    }
    
    axios
      .post("/api/updatestory", { storyData })
      .then(response => {
        console.log(response);
        const res = response.data;
        console.log(res);
        if (res.successful) {
          console.log(res.story_id);
        }
        console.log("new story id is", res.story_id);

        alert("Story uploaded");
      });
  };

  return (
    <div>
      <div>
        You are currently editing:
        <b>{propStory.story.posting_title}</b>
      </div>

      <div className="inside-wrapper">
        <div className="width-200px"> Posting title </div>
        <div>
          <input
            type="text"
            id="inputPostingTitle"
            onFocus={handleOnFocusPostingTitle}
            onChange={e => {
              setPostingTitle(e.target.value);
            }}
          />
        </div>
        {postingTitleFocus && (
          <div className="left-margin-150px">
            <i>Old title: {propStory.story.posting_title}</i>
          </div>
        )}
      </div>

      <div className="inside-wrapper">
        <div className="width-200px"> Description </div>
        <div>
          <textarea
            cols="22"
            type="text"
            id="inputDescription"
            onFocus={handleOnFocusDescription}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        {descriptionFocus && (
          <div className="left-margin-150px">
            <i>Old description: {propStory.story.description}</i>
          </div>
        )}
      </div>

      <div className="inside-wrapper">
        <div className="width-200px"> Tools </div>
        <div>
          <input
            type="text"
            id="inputTools"
            onFocus={handleOnFocusTools}
            onChange={e => {
              setTools(e.target.value);
            }}
          />
        </div>
        {toolsFocus && (
          <div className="left-margin-150px">
            <i>Old tools: {propStory.story.tool}</i>
          </div>
        )}
      </div>

      <div className="inside-wrapper">
        <div className="width-200px"> Material </div>
        <div>
          <input
            type="text"
            id="inputMaterial"
            onFocus={handleOnFocusMaterial}
            onChange={e => {
              setMaterial(e.target.value);
            }}
          />
        </div>
        {materialFocus && (
          <div className="left-margin-150px">
            <i>Old material: {propStory.story.material}</i>
          </div>
        )}
      </div>

      <div className="inside-wrapper">
        <div className="width-200px"> Category </div>
        <div>
          <input
            type="text"
            id="inputCategory"
            onFocus={handleOnFocusCategory}
            onChange={e => {
              setCategory(e.target.value);
            }}
          />
        </div>
        {categoryFocus && (
          <div className="left-margin-150px">
            <i>Old category: {propStory.story.category}</i>
          </div>
        )}
      </div>

      <div className="inside-wrapper">
        <div className="width-200px"> Tag </div>
        <div>
          <input
            type="text"
            id="inputTag"
            onFocus={handleOnFocusTag}
            onChange={e => {
              setTag(e.target.value);
            }}
          />
        </div>
        {tagFocus && (
          <div className="left-margin-150px">
            <i>Old tags: {propStory.story.tag}</i>
          </div>
        )}
      </div>

      <button onClick={handleSubmit}> Submit </button>
    </div>
  );
};

export default EditStory;
