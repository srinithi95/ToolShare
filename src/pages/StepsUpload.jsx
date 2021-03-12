import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./stepsupload.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const StepsUpload = ({ storyId }) => {
  const [stepText, setStepText] = React.useState("");
  const [stepArray, setStepArray] = React.useState([]);
  const [stepVisible, setStepVisible] = React.useState(false);

  const handleEdit = () => {
    console.log("Edit called");
  };

  const handleAddStep = () => {
    console.log("in handle add stpe");
    const stepData = {
      storyId,
      stepText
    };

    var node = document.createElement("LI");
    var textnode = document.createTextNode(stepText);
    var node1 = document.createElement("button");
    node1.textContent = "Edit";
    node.appendChild(textnode);
    node.appendChild(node1);
    document.getElementById("steplist").appendChild(node);

    axios
      .post("/api/addsteps", { stepData })
      .then(response => {
        console.log(response);
      });

    document.getElementById("step-textarea").value = "";
  };

  const test = () => {
    console.log("test called");
    var frame1 = document.getElementById("mainframe");
    const form1 = document.createElement("form");
    
    const div1 = document.createElement("div");
    div1.textContent = "choose image for step"
    form1.appendChild(div1);

    const input1 = document.createElement("input");
    input1.type = "file";
    form1.appendChild(input1);

    const div2 = document.createElement("div");
    div2.textContent = "Step Title"
    form1.appendChild(div2);

    const input2 = document.createElement("input");
    input2.type = "text";
    form1.appendChild(input2);

    const div3 = document.createElement("div");
    div3.textContent = "Step Description"
    form1.appendChild(div3);

    const input3 = document.createElement("input");
    input3.type = "text";
    form1.appendChild(input3);

    frame1.appendChild(form1);
  };

  const test1 = () => {
    var Tid = Date.now();

    const form1 = document.getElementById("insideframe");
    const maindiv = document.createElement("div");
    maindiv.className = "maindiv-border"

    const div1 = document.createElement("div");
    div1.textContent = "Choose an image";
    div1.className = "maindiv-margin"
    maindiv.appendChild(div1);

    const input1 = document.createElement("input");
    input1.type = "file";
    input1.addEventListener("change", (e) => loadFile(e, `${Tid}`));
    input1.className = "maindiv-margin"
    maindiv.appendChild(input1);

    const div4 = document.createElement("div");
    const img1 = document.createElement("img");
    img1.id = `${Tid}`;
    img1.className = "imageframe maindiv-margin";
    img1.alt = "Your image will be displayed here."
    div4.appendChild(img1);
    div4.className = "maindiv-margin";
    maindiv.appendChild(div4);

    const div2 = document.createElement("div");
    div2.textContent = "Step Title"
    div2.className="maindiv-margin"
    maindiv.appendChild(div2);

    const input2 = document.createElement("input");
    input2.type = "text";
    input2.className="maindiv-margin"
    maindiv.appendChild(input2);

    const div3 = document.createElement("div");
    div3.textContent = "Step Description"
    div3.className = "maindiv-margin"
    maindiv.appendChild(div3);

    const input3 = document.createElement("textarea");
    input3.cols="70";
    input3.rows="8";
    input3.className = "maindiv-margin"
    maindiv.appendChild(input3);

    form1.appendChild(maindiv);
  }

  const loadFile = (event, id) => {
    console.log("idddddddddddddddddd", id);
    var image = document.getElementById(id);
    image.src = URL.createObjectURL(event.target.files[0]);
  }

  return (
    <div className="container">
      <div>These are the steps for story: --- {storyId}</div>
      <div id="mainframe">
        <form id="step_upload_form" enctype="multipart/form-data" action="/postStepsImage"
          method="post">
          <div id="insideframe">
            <div className="maindiv-border">
          <div className="maindiv-margin"> Choose an image: <input type="file" name="step-image" onChange={(e) => loadFile(e, "output")}/></div>
          <div className="maindiv-margin"> <img id="output" className="imageframe" alt="Your image will be displayed here"/> </div>
          <div className="maindiv-margin"> Step Number <div><input type="text" name="stepNumber"/> </div></div>
          <div className="maindiv-margin"> Step Title <div><input type="text" name="stepTitle"/> </div></div>
          <div className="maindiv-margin"> Step Description <div> <textarea type="text" cols="70" rows="8" name="stepDescription"/> </div></div>
          </div></div>
          <div> <input type="submit" value="Submit step" /> </div>
        </form>
        
      </div>
      <div> <button onClick={test1}> Add Step </button></div>
    </div>
  );
};

const mapStateToProps = state => ({
  storyId: state.shareYourStoryReducer.storyId
});

export default connect(mapStateToProps)(StepsUpload);
