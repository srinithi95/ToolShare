import React from "react";
import "./shareyourstory.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { setStoryId } from "../redux/actions/shareYourStoryActions";
import { connect } from "react-redux";

const ShareYourStory = ({ dispatch, userId }) => {
  const [postingTitle, setPostingTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tool1, setTool1] = React.useState("");
  const [tool2, setTool2] = React.useState("");
  const [tool3, setTool3] = React.useState("");
  const [tool4, setTool4] = React.useState("");
  const [tool5, setTool5] = React.useState("");

  const [material1, setMaterial1] = React.useState("");
  const [material2, setMaterial2] = React.useState("");
  const [material3, setMaterial3] = React.useState("");
  const [material4, setMaterial4] = React.useState("");
  const [material5, setMaterial5] = React.useState("");

  const [tag1, setTag1] = React.useState("");
  const [tag2, setTag2] = React.useState("");
  const [tag3, setTag3] = React.useState("");

  // const [category, setCategory] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [step1, setStep1] = React.useState(false);
  var [toolCount, setToolCount] = React.useState(3);
  var [materialCount, setMaterialCount] = React.useState(3);
  var [tagCount, setTagCount] = React.useState(2);
  
  const handleSubmit = () => {
    console.log("In handle submit");
    
    const tools = [tool1, tool2, tool3, tool4, tool5];
    const materials = [material1, material2, material3, material4, material5];
    const tag = [tag1, tag2, tag3];
    
    var category = Array.from(document.getElementById("category").options).filter(option => option.selected).map(option => option.value);

    if(category.length > 3)
      alert("You have selected more than 3 categories");
    else {
      const storyData = {
        postingTitle,
        description,
        tools,
        materials,
        category,
        tag,
        userId
      };
  
      console.log("storydata is", storyData);
      axios
        .post("/api/postStory", { storyData })
        .then(response => {
          console.log(response);
          const res = response.data;
          console.log(res);
          if (res.successful) {
            console.log(res.story_id);
            dispatch(setStoryId(res.story_id));
            setStep1(true);
          }
          console.log("new story id is", res.story_id);
  
          alert("Story uploaded");
        });
    }
  };

  const addTool = () => {
    if(toolCount == 6){
      alert("You have already added 5 tools")
    }
    else{
    console.log("add tool called");
    const maindiv = document.getElementById("Tool-div");
    const tempdiv = document.createElement("div");
    tempdiv.className = "width-200px";

    const tempinput = document.createElement("input");
    if(toolCount == 3)
      tempinput.addEventListener("change", (e) => setTool3(e.target.value));
    else if(toolCount == 4)
      tempinput.addEventListener("change", (e) => setTool4(e.target.value));
    else if(toolCount == 5)
      tempinput.addEventListener("change", (e) => setTool5(e.target.value));
    tempdiv.appendChild(tempinput);
    // input1.addEventListener("change", (e) => loadFile(e, `${Tid}`));  

    maindiv.appendChild(tempdiv);
    console.log("tool count before", toolCount);
    toolCount = toolCount + 1;
    console.log("tool count after", toolCount);
    setToolCount(toolCount);
    }
  }

  const addMaterial = () => {
    if(materialCount == 6){
      alert("You have already added 5 materials for this story.")
    }
    else{
      console.log("add material called");
    const maindiv = document.getElementById("Material-div");
    const tempdiv = document.createElement("div");
    tempdiv.className = "width-200px";

    const tempinput = document.createElement("input");
    if(materialCount == 3)
      tempinput.addEventListener("change", (e) => setMaterial3(e.target.value));
    else if(materialCount == 4)
      tempinput.addEventListener("change", (e) => setMaterial4(e.target.value));
    else if(materialCount == 5)
      tempinput.addEventListener("change", (e) => setMaterial5(e.target.value));
    tempdiv.appendChild(tempinput);
    
    maindiv.appendChild(tempdiv);
    materialCount = materialCount + 1;
    setMaterialCount(materialCount);
    }
  }

  const addTag = () => {
    if(tagCount == 4){
      alert("You have already added 3 tags for this story.")
    }
    else{
    console.log("add tag called");
    const maindiv = document.getElementById("tag-div");
    const tempdiv = document.createElement("div");
    tempdiv.className = "width-200px";

    const tempinput = document.createElement("input");
    if(tagCount == 2)
      tempinput.addEventListener("change", (e) => setTag2(e.target.value));
    else if(tagCount == 3)
      tempinput.addEventListener("change", (e) => setTag3(e.target.value));
    tempdiv.appendChild(tempinput);
    
    maindiv.appendChild(tempdiv);
    tagCount = tagCount + 1;
    setTagCount(tagCount);
    }
  }

  return (
    <div className="wrapper container">
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20">
          <b> Post your story !!! </b>{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px"> <strong>Posting title </strong> <span className="red-text">*</span></div>
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
      <div> <strong>Which tools did you use for this story ? (Max: 5)</strong></div>
      <div className="inside-wrapper" id="Tool-div">
        <div className="width-200px">
          <input
            type="text"
            onChange={e => {
              setTool1(e.target.value);
            }}
          />
        </div>
        <div className="width-200px">
          <input
            type="text"
            onChange={e => {
              setTool2(e.target.value);
            }}
          />
        </div>
      </div>
      <div> <button onClick={addTool}> Add Tool </button></div>
      <div> <strong>Which materials did you use in this story ? (Max: 5)</strong></div>
      <div className="inside-wrapper" id="Material-div">
        <div className="width-200px">
          <input
            type="text"
            onChange={e => {
              setMaterial1(e.target.value);
            }}
          />
        </div>
        <div className="width-200px">
          <input
            type="text"
            onChange={e => {
              setMaterial2(e.target.value);
            }}
          />
        </div>
      </div>
      <div> <button onClick={addMaterial}> Add Material </button></div>
      <div> <strong>Give one or multiple category for this story (Max: 3)</strong></div>
      <div className="inside-wrapper">
        <div>
          {/* <input
            type="text"
            onChange={e => {
              setCategory(e.target.value);
            }}
          /> */}
          <select id="category" name="category" size="5" multiple>
            <option value="living room">Living Room</option>
            <option value="bedroom">Bed room</option>
            <option value="bathroom">Bath room</option>
            <option value="laundry room">Laundry room</option>
            <option value="Garden">Garden </option>
            <option value="Car or bike"> Car or bike</option>
          </select>
        </div>
      </div>
      <div> <strong>Give one or multiple tag/s for this story (Max: 3)</strong></div>
      <div className="inside-wrapper" id="tag-div">
        <div className="width-200px">
          <input
            type="text"
            onChange={e => {
              setTag1(e.target.value);
            }}
          />
        </div>
      </div>
      <div> <button onClick={addTag}> Add Tag </button></div>
      {/* <div>
        <form action="/postStoryImage" method="post" enctype="multipart/form-data">
          <input type="file" name="avatar" />
          <input type="submit" value="Submit image" />
        </form>
      </div> */}
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20"> {/* <b> Steps </b>{" "} */}</div>
      </div>
      <div className="align-centre1 inside-wrapper">
        <div>
          <button onClick={handleSubmit}> Submit </button>{" "}
        </div>
        <div>
          {step1 && (
            <div>
              <div>Click on next to upload images and steps </div>
              <div id="nextdiv">
                <NavLink to="/imageupload" className="">
                  Next
                </NavLink>
              </div>
            </div>
          )}
        </div>
        <div>
          <Switch>
            <Route path="/imageupload" component={ImageUpload} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  userId: state.userReducer.userId
});

export default connect(mapStateToProps)(ShareYourStory);