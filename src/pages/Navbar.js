import React from "react";
import "./Navbar.css";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ShareYourStory from './ShareYourStory.jsx';
import RegisterUsers from './RegisterUsers.jsx';
import Carousel from "./Carousel.js";

export const Navbar = () => {
  return (
    <div className="nav-bar">
      
      <div className="nav-bar-item">
        <NavLink to="/shareyourstory" className="nav-bar-button">
          Share your story
        </NavLink>
      </div>
      <div>
        <NavLink to="/registerusers" className="nav-bar-button">
          Register User
        </NavLink>
      </div>

      <Switch>
        <Route path="/registerusers" component={RegisterUsers} />
        <Route path="/shareyourstory" component={ShareYourStory} />
        <Route path="/" component={Carousel} />
      </Switch>
    </div>
  );
};
