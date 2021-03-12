import React from "react";
import "./toolposting.css";
import axios from "axios";
import { connect } from "react-redux";
import { setToolId } from "../redux/actions/shareYourToolAction";
import ToolImageUpload from "./ToolImageUpload";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const ToolPosting = ({
  firstName,
  userId,
  userEmail,
  userAddress,
  userCity,
  userState,
  userZipCode,
  userContactNumber,
  dispatch,
}) => {
  const [toolName, setToolName] = React.useState("");
  const [price, setPrice] = React.useState("");
  // const [availability, setAvailability] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [make, setMake] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [modelName, setModelName] = React.useState("");
  const [suggestedProject, setSuggestedProject] = React.useState("");

  const [email, setEmail] = React.useState(userEmail);
  const [contactNumber, setContactNumber] = React.useState(userContactNumber);
  const [contactName, setContactName] = React.useState(firstName);
  const [address, setAddress] = React.useState(userAddress);
  const [city, setCity] = React.useState(userCity);
  const [state, setState] = React.useState(userState);
  const [zipcode, setZipcode] = React.useState(userZipCode);

  const [step1, setStep1] = React.useState(false);

  React.useEffect(() => {
    handleChangeLocation(true);
  }, []);

  const handleChangeLocation = (currentLocation) => {
    if (currentLocation) {
      document.getElementById("email-input1").value = userEmail;
      document.getElementById("address-input1").value = userAddress;
      document.getElementById("city-input1").value = userCity;
      document.getElementById("state-input1").value = userState;
      document.getElementById("zipcode-input1").value = userZipCode;
      document.getElementById("contactnumber-input1").value = userContactNumber;
      document.getElementById("contactname-input1").value = firstName;
    } else {
      document.getElementById("email-input1").value = "";
      document.getElementById("address-input1").value = "";
      document.getElementById("city-input1").value = "";
      document.getElementById("state-input1").value = "";
      document.getElementById("zipcode-input1").value = "";
      document.getElementById("contactnumber-input1").value = "";
      document.getElementById("contactname-input1").value = "";
    }
  };

  const handleSubmit = () => {
    console.log("in handle submit");
    const toolData = {
      toolName,
      price,
      // availability,
      description,
      make,
      condition,
      modelName,
      suggestedProject,
      email,
      contactNumber,
      contactName,
      address,
      city,
      state,
      zipcode,
      userId,
    };

    console.log("tooldata is", toolData);
    axios
      .post("/api/postTool", { toolData })
      .then((response) => {
        console.log(response);
        const res = response.data;
        if (res.successful) {
          console.log(res.tool_id);
          dispatch(setToolId(res.tool_id));
          setStep1(true);
        }
        alert("Tool uploaded");
      });
  };

  return (
    <div className="wrapper container">
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20">
          <b> Share your tool </b>{" "}
        </div>
      </div>

      {/* Form starts here */}

      {/* Basic details */}
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Tool name </strong> <span className="red-text">*</span>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setToolName(e.target.value);
            }}
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Price </strong> <span className="red-text">*</span>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />{" "}
          <i>$/hour</i>
        </div>
      </div>
      {/* <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Availability </strong>
        </div>
        <div>
          {" "}
          <input
            type="date"
            onChange={(e) => {
              setAvailability(e.target.value);
            }}
          />{" "}
        </div>
      </div> */}
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Description </strong> <span className="red-text">*</span>
        </div>
        <div>
          {" "}
          <textarea
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows="5"
            cols="50"
          />{" "}
        </div>
      </div>

      {/* Tool details */}
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20">
          <b> Details </b>{" "}
        </div>
      </div>

      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Make/Manufacturer </strong>{" "}
          <span className="red-text">*</span>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setMake(e.target.value);
            }}
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Condition </strong>
          <span className="red-text">*</span>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setCondition(e.target.value);
            }}
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          {" "}
          <strong>Model Name </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setModelName(e.target.value);
            }}
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          {" "}
          <strong>Suggested Project </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setSuggestedProject(e.target.value);
            }}
          />{" "}
        </div>
      </div>

      {/* Contact Details */}
      <div className="align-centre1 inside-wrapper">
        <div className="font-size-20">
          <b> Contact Details </b>{" "}
        </div>
      </div>

      {/* Choose user address */}
      <div className="align-centre1 inside-wrapper width-500px">
        <div
          id="stories-tab"
          className="green-border button-inside-wrapper text-align-centre cursor-pointer"
          onClick={() => {
            handleChangeLocation(true);
          }}
        >
          Post to your current location
        </div>
        <div
          id="stories-tab"
          className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
          onClick={() => {
            handleChangeLocation(false);
          }}
        >
          Post to a different location
        </div>
      </div>

      <div className="inside-wrapper">
        <div className="width-200px">
          {" "}
          <strong>Email </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            id="email-input1"
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Contact Number </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
            id="contactnumber-input1"
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Contact Name </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setContactName(e.target.value);
            }}
            id="contactname-input1"
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Address </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            id="address-input1"
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> City </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            id="city-input1"
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          {" "}
          <strong>State </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setState(e.target.value);
            }}
            id="state-input1"
          />{" "}
        </div>
      </div>
      <div className="inside-wrapper">
        <div className="width-200px">
          <strong> Zipcode </strong>
        </div>
        <div>
          {" "}
          <input
            type="text"
            onChange={(e) => {
              setZipcode(e.target.value);
            }}
            id="zipcode-input1"
          />{" "}
        </div>
      </div>

      {/* experimental form */}
      {/* <div>
        <form
          id="image_upload_form"
          action="/postToolImage"
          method="post"
          enctype="multipart/form-data"
          // onSubmit={handleSubmitImage}
        >
          <input type="file" name="image-file" />
          <input type="text" name="storyIdInput" id="storyText" value={storyId}/> 
          <input type="submit" value="Submit image" />
        </form>
      </div> */}

      {/* Submit Button */}
      <div className="align-centre1 inside-wrapper">
        <div>
          <button onClick={handleSubmit}> Submit </button>
        </div>
      </div>

      <div>
        <div>
          <div>
            <div>Click on next to upload image for the tool</div>
            <div id="nextdiv">
              <NavLink to="/toolimageupload" className="">
                Next
              </NavLink>
            </div>
          </div>
        </div>
        <div>
          <Switch>
            <Route path="/toolimageupload" component={ToolImageUpload} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userReducer.userId,
  userEmail: state.userReducer.userEmail,
  userAddress: state.userReducer.userAddress,
  userCity: state.userReducer.userCity,
  userState: state.userReducer.userState,
  userZipCode: state.userReducer.userZipCode,
  userContactNumber: state.userReducer.userContactNumber,
  firstName: state.userReducer.firstName,
});

export default connect(mapStateToProps)(ToolPosting);
