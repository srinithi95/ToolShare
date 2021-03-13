import React from "react";
import ReactDOM from "react-dom";
import "./Carousel.css";
import axios from "axios";
import { connect } from "react-redux";
import StoryDetails from "../pages/StoryDetails";
import ToolDetails from "./ToolDetails";
import {
  setUserId,
  setIsLoggedIn,
  setFirstName,
  setAddress,
  setCity,
  setState,
  setZipCode,
  setUserEmail,
  setContactNumber
} from "../redux/actions/userActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import SaveStory from "./SaveStory";
import UserStory from "./UserStory";
import LandingPage from "./LandingPage";
import UserReservations from "./UserReservations";

const Carousel = ({ dispatch, isLoggedIn, firstName, userId }) => {
  console.log("in carousel, logged in is", isLoggedIn);
  const [storyArray, setStoryArray] = React.useState([]);
  const [toolArray, setToolArray] = React.useState([]);
  const [searchStory, setSearchStory] = React.useState(" ");
  const [searchTool, setSearchTool] = React.useState("");
  const [storyActive, setStoryActive] = React.useState(true);
  const [toolActive, setToolActive] = React.useState(false);

  React.useEffect(() => {
    console.log("use effect 1 called");
    axios.get("/api/getStory").then(response => {
      console.log(response.data);
      setStoryArray(response.data);
    });
  }, []);

  React.useEffect(() => {
    console.log("use effect 1 called");
    axios.get("/api/getTool").then(response => {
      // console.log(response.data);
      setToolArray(response.data);
    });
  }, []);

  if (!isLoggedIn) {
    let cookieData = document.cookie.split(";");
    let eqPos1 = cookieData[0].indexOf("=") + 1;
    let email = cookieData[0].substr(eqPos1, cookieData[0].length);

    let eqPos2 = cookieData[0].indexOf("=") + 1;
    let password = cookieData[0].substr(eqPos2, cookieData[0].length);
    const authData = {
      email,
      password
    };
    console.log("logindata in carousel", authData);

    axios.post("/api/auth", { authData }).then(response => {
      const res = response.data;
      console.log("response", response);
      if (res === "not registered user") {
        //alert("You are not logged in");
      } else {
        let userId = res[0].users_id;
        console.log(userId);
        dispatch(setUserId(userId));
        console.log("before dispatch", res[0]);
        console.log("h")
        dispatch(setIsLoggedIn(true));
        let firstName = res[0].first_name;
        let email = res[0].email;
        dispatch(setFirstName(firstName));
        dispatch(setUserEmail(email));
        dispatch(setAddress(res[0].address));
        dispatch(setContactNumber(res[0].contact_number));
        dispatch(setCity(res[0].city));
        dispatch(setState(res[0].state));
        dispatch(setZipCode(res[0].zipcode));
      }
    });
  }

  return (
    <div id="xyz" className="container wrapper">
      {/* part to tell that the user is logged in or not */}
      {!isLoggedIn && (
        <div className="inside-wrapper">
          Please log in to post story or tool.
        </div>
      )}

      {isLoggedIn && (
        <div>
          <div className="nav-bar1">
            <div className="nav-bar-item">
              <NavLink to="/landingpage" className="nav-bar-button">
                Explore
              </NavLink>
            </div>
            <div className="nav-bar-item">
              <NavLink to="/savestory" className="nav-bar-button">
                My Saved Story
              </NavLink>
            </div>
            <div className="nav-bar-item">
              <NavLink to="/userstory" className="nav-bar-button">
                My Stories
              </NavLink>
            </div>
            <div className="nav-bar-item">
              <NavLink to="/userreservations" className="nav-bar-button">
                My Reservations
              </NavLink>
            </div>
          </div>

          <div>
            <Switch>
              <Route path="/savestory" component={SaveStory} />
              <Route path="/userstory" component={UserStory} />
              <Route path="/landingpage" component={LandingPage} />
              <Route path="/userreservations" component={UserReservations} />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  userId: state.userReducer.userId
});

export default connect(mapStateToProps)(Carousel);
