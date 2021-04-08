import React from "react";
import "./App.css";
import { Navbar } from "./pages/Navbar";
import Carousel from "./pages/Carousel";
import ShareYourStory from "./pages/ShareYourStory";
import ToolPosting from "./pages/toolPosting";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import {
  setIsLoggedIn,
} from "./redux/actions/userActions";
import RegisterUsers from "./pages/RegisterUsers";
import Login from "./pages/Login";
import ImageUpload from "./pages/ImageUpload";
import StepsUpload from "./pages/StepsUpload";
import ToolImageUpload from "./pages/ToolImageUpload";
import LandingPage from "./pages/LandingPage";

export function App({ dispatch, isLoggedIn }) {
  console.log("in app", isLoggedIn);
  const handleLogout = () => {
    document.cookie = `email=""`;
    document.cookie = `password=""`;
    dispatch(setIsLoggedIn(false));
     
  };
  return (
    <div>
      <div className="nav-bar">      
        {isLoggedIn && (
          <div className="nav-bar-item">
            <NavLink to="/shareyourstory" className="nav-bar-button">
              Share your story
            </NavLink>
          </div>
        )}
        {isLoggedIn && (
          <>
          <div className="nav-bar-item">
            <NavLink to="/posttool" className="nav-bar-button">
              Post a Tool
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
        <button onClick={handleLogout}>Logout</button>
        </>
        )}

        {!isLoggedIn && (
          <div className="nav-bar-item"> 
            <NavLink to="/login" className="nav-bar-button">
              Login
            </NavLink>
          </div>
        )}
      </div>
      <div>
        <Switch>
          <Route path="/posttool" component={ToolPosting} />
          <Route path="/login" component={Login} />
          <Route path="/registerusers" component={RegisterUsers} />
          <Route path="/shareyourstory" component={ShareYourStory} />
          <Route path="/imageupload" component={ImageUpload} />
          <Route path="/stepsupload" component={StepsUpload} />
          <Route path="/toolimageupload" component={ToolImageUpload} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
});

export default connect(mapStateToProps)(App);
