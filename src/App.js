import React from "react";
import "./App.css";
import { Navbar } from "./pages/Navbar";
import Carousel from "./pages/Carousel";
import ShareYourStory from "./pages/ShareYourStory";
import ToolPosting from "./pages/toolPosting";
// import { RegisterUsers } from "./pages/RegisterUsers";
//import userReducer from './redux/reducers/userReducer';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import RegisterUsers from "./pages/RegisterUsers";
import Login from "./pages/Login";
import ImageUpload from "./pages/ImageUpload";
import StepsUpload from "./pages/StepsUpload";
import ToolImageUpload from "./pages/ToolImageUpload";

export function App({ isLoggedIn }) {
  console.log("in app", isLoggedIn);
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
          <div className="nav-bar-item">
            <NavLink to="/posttool" className="nav-bar-button">
              Post a Tool
            </NavLink>
          </div>
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
          <Route path="/" component={Carousel} />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
});

export default connect(mapStateToProps)(App);
