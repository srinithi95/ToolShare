import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  setUserId,
  setIsLoggedIn,
  setFirstName,
  setAddress,
  setCity,
  setState,
  setZipCode,
  setUserEmail,
  setContactNumber,
} from "../redux/actions/userActions";
import ReactDOM from "react-dom";
import StoryDetails from "../pages/StoryDetails";
import ToolDetails from "./ToolDetails";
import UserToolDetails from "./UserToolDetails";
import "./landingpage.css";
import BookingPage from "./BookingPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ToolMap from "./ToolMap";
import Paper from '@material-ui/core/Paper';
import { useCookies } from 'react-cookie';


const LandingPage = ({ dispatch, isLoggedIn, firstName, userId }) => {
  console.log("in landing page");
  const [storyArray, setStoryArray] = React.useState([]);
  const [toolArray, setToolArray] = React.useState([]);
  const [searchStory, setSearchStory] = React.useState(" ");
  const [searchTool, setSearchTool] = React.useState();
  const [searchToolCity, setSearchToolCity] = React.useState();
  const [storyActive, setStoryActive] = React.useState(true);
  const [toolActive, setToolActive] = React.useState(false);
  const [mainStoryArray, setMainStoryArray] = React.useState([]);
  const [toolCoordinatesArray, setToolCoordinatesArray] = React.useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  


  React.useEffect(() => {
    
   
    axios.get("/api/getStory").then((response) => {
      console.log(response.data);
      setStoryArray(response.data);
      setMainStoryArray(response.data);
      // setStoryToolArray(response.data.tool1);
      // console.log("----------", storyToolArray);
    });
  }, []);

  React.useEffect(() => {
    console.log("use effect 1 called");
    axios.get("/api/getTool").then((response) => {
      // console.log(response.data);
      setToolArray(response.data);
    });
  }, []);
console.log("Test user Id", userId);
console.log("cookie test", cookies.userId);
  React.useEffect(() => {
    console.log("in address useeffect");
    console.log("Tools Array",toolArray)
    toolArray.map((t) => {
      let url =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        t.address +
        t.city +
        t.state +
        t.zipcode +
        "&key=AIzaSyALPCrM1o0G3wqbTLToT2KWvsExLao5vhE";
      console.log("url is", url);
      axios.get(url)
      .then((response) => {
        console.log(response)
        toolCoordinatesArray.push(response.data.results[0].geometry.location);
      });
    });
    console.log("&&&&&&&&&&&&&&&", toolCoordinatesArray);
  }, [toolArray]);
  if(cookies.name){
    dispatch(setIsLoggedIn(true));
    dispatch(setUserId(cookies.userId));
  dispatch(setFirstName(cookies.name))

  }
/*
  if (!isLoggedIn && document.cookie.email!=null ) {
    console.log("the cookie is", document.cookie.email)
    let cookieData = document.cookie.split(";");
    let eqPos1 = cookieData[0].indexOf("=") + 1;
   let email = cookieData[0].substr(eqPos1, cookieData[0].length);
    console.log("****Email is****", email);

    let eqPos2 = cookieData[1].indexOf("=") + 1;
    let password = cookieData[1].substr(eqPos2, cookieData[1].length);
    console.log("***password is***", password);
    const authData = {
      email,
      password,
    };
    console.log("logindata in carousel", authData);
    console.log("Login data inside landing page", isLoggedIn)

    axios.post("/api/auth", { authData })
    .then((response) => {
      const res = response.data;
      console.log("response for auth srinithi", response);
      if (res === "not registered user") {
        //alert("You are not logged in");
      } else {
        let userId = res[0].users_id;
        console.log(userId);
        dispatch(setUserId(userId));
        console.log("before dispatch", res[0]);
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
      
    })
    .then(console.log("Login data inside landing page 2", isLoggedIn));
  } */

  const handleSearchStory = () => {
    console.log("in handle search story", searchStory);
    const searchData = {
      searchStory,
    };

    axios
      .post("/api/searchStory", { searchData })
      .then((response) => {
        console.log(response.data);
        setStoryArray(response.data);
      });
  };

  const handleSearchTool = () => {
    console.log("in handle search tool", searchTool);
    //should be post request
    const searchData = {
      searchTool,
      
    };

    axios
      .post("/api/searchTool", { searchData })
      .then((response) => {
        console.log(response.data);
        setToolArray(response.data);
      });
  };

  const changeToStory = () => {
    setStoryActive(true);
    setToolActive(false);
  };
  const handleBookingOnClick =(toolname,toolId)=>{
    const state=  {
      toolname: toolname,
      toolId: toolId,
    }
 ReactDOM.render(<BookingPage state={state} />, document.getElementById("xyz"));
  }
  const changeToTool = () => {
    setStoryActive(false);
    setToolActive(true);
  };

  const handleStoryDetails = (s) => {
    console.log("handle story details called", s);
    ReactDOM.render(<StoryDetails story={s} />, document.getElementById("xyz"));
  };

  const handleToolDetails = (t) => {
    console.log("handle tool details called", t);
    ReactDOM.render(<ToolDetails tool={t} />, document.getElementById("xyz"));
  };

  const handleLogout = () => {
    document.cookie = `email=""`;
    document.cookie = `password=""`;
    dispatch(setIsLoggedIn(false));
    removeCookie("UserId");
     
  };

  const handleStorySave = (s) => {
   console.log("count")

    let storyId = s.story_id;
    const saveData = {
      storyId,
      userId,
    };
    axios
      .post("/api/saveStory", { saveData })
      .then((response) => {
        console.log(response);
        
      });
  };

  const handleToolOnClick = (tool) => {
    // const toolData = [tool, userId]
    ReactDOM.render(
      <UserToolDetails tool={[tool, userId]} />,
      document.getElementById("xyz")
    );
  };
 
  const changeCategory = (selectedCategory) => {
    console.log("in change Category", selectedCategory);
    console.log("storyarray ----", storyArray);

    if (selectedCategory == "All") setStoryArray(mainStoryArray);
    else {
      var tempArray = mainStoryArray.filter(
        (mainStoryArray) =>
          mainStoryArray.category1 == selectedCategory ||
          mainStoryArray.category2 == selectedCategory ||
          mainStoryArray.category3
      );
      console.log("----te", tempArray, typeof selectedCategory);
      setStoryArray(tempArray);
    }
  };

  function Try() {
    return (
      <div id="xyz" className="container wrapper">
        {/* Display categories */}
        <div className="align-centre1 inside-wrapper">
          <div
            id="stories-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("All")}
          >
            Indoor stories
          </div>
          <div
            id="stories-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("Living room upgrade")}
          >
            Outdoor stories
          </div>
          <div
            id="tools-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("Outdoor")}
          >
            Gardening
          </div>
          <div
            id="tools-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("Bike and Car")}
          >
            Bike or cars
          </div>
          <div
            id="tools-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("Gardening")}
          >
            Others
          </div>
        </div>

        {/* subcategories */}
        {/* <div className="align-centre1 inside-wrapper">
          <div
            id="stories-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("All")}
          >
            Living room upgrade
          </div>
          <div
            id="stories-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("Living room upgrade")}
          >
            Bedroom upgrade
          </div>
          <div
            id="tools-tab"
            className="green-border font-size-16 button-inside-wrapper text-align-centre cursor-pointer"
            onClick={() => changeCategory("Outdoor")}
          >
            Kitchen upgrade
          </div>
        </div> */}

        {/* tabs */}
        <div className="align-centre1 inside-wrapper">
          <div
            id="stories-tab"
            onClick={changeToStory}
            className="brown-border font-size-20 button-inside-wrapper text-align-centre cursor-pointer"
          >
            <b> Stories </b>
          </div>
          <div
            id="tools-tab"
            onClick={changeToTool}
            className="brown-border font-size-20 button-inside-wrapper text-align-centre cursor-pointer"
          >
            <b> Tools </b>
          </div>
        </div>
      {isLoggedIn &&  <div><i> <b>&nbsp; &nbsp; &nbsp;Hello {firstName}, Welcome!!</b></i>  </div>}
      
        {/* Tab contents */}
        <div>
          {storyActive && (
            <div>
              {/* Stories tab */}
              <div className="align-centre1 inside-wrapper">
                <div className="font-size-20">
                  <b> Stories </b>
                </div>
              </div>

              {/* Search bar in stories */}
             <div className="align-centre1 inside-wrapper"> 
                <div>    
                </div>
                <div>
                <input
                    id="search"
                    type="text"
                    id="srinith-stpry"           
                    onBlur={(e)=>{ 
                      setSearchStory(e.target.value) 
                    }}
                  />
                  <button onClick={handleSearchStory}> Find story </button>
                </div>
              </div>

              {/* Display all stories using array */}
              <div>
                <ol>
                  {storyArray.map((s) => (
                    <div >
                    <Paper elevation={4} className="paper" margin ="6">
                    <div className="postingframe" onClick={() => handleStoryDetails(s)}>
                      <div className="width500px">
                        
                        <b>{s.posting_title}</b> by <b>{s.first_name}    </b><br/>
                        
                        <div className="display">
                        <img src={s.story_image_url} className="imageframe" />
                        
                        <div>{s.description}</div>
                        <br/>
                        </div>
                      </div> 
                    </div>
                    {isLoggedIn && (
                              <button onClick={() => handleStorySave(s)}>
                                Save
                              </button>
                            )}
                    </Paper>
                    <br/>
                    
                    </div>
                   
                    
                  ))}
                </ol>
              </div>
            </div>
          )}

          {toolActive && (
            
            <div>
              
              {/* Tools tab */}
              <div className="align-centre1 inside-wrapper">
                <div className="font-size-20">
                  <b> Tools </b>
                </div>
              </div>
              

              {/* Search bar in tools */}
              <div className="align-centre1 inside-wrapper">
                <div>
                  Toolname
                  <input
                    type="text"
                    
                    onBlur={(e) => {
                      setSearchTool(e.target.value);
                    }}
                    className="margin-left-10px"
                  />
                </div>
                <div className="margin-left-40px">
                  City
                  <input
                    type="text"
                    value={searchToolCity}
                    onChange={(e) => {
                      setSearchToolCity(e.target.value);
                    }}
                    className="margin-left-10px"
                  />
                </div>
                <div className="margin-left-40px">
                  <button onClick={handleSearchTool}> Find tools </button>
                </div>
              </div>

              {/* Displaying Map */}
              <div className="map-container margin-left-top-30px">
            <ToolMap coordinates={toolCoordinatesArray} />
          </div>
              

              {/* Display all tools using array */}
              <div>
                <ol>
                  {toolArray.map((t) => (
                    <div className="round-border-tooldiv">
                      <div>
                        <b>{t.tool_name}</b>
                        <div className="flex-wrapper-row">
                          <div className="width-350px">
                            <span>Make:</span> <span>{t.make}</span>
                          </div>
                          <div className="width-350px">
                            <span>Contact Name:</span>{" "}
                            <span>{t.contact_name}</span>
                          </div>
                          
                          
                        </div>
                        <div className="flex-wrapper-row">
                          <div className="width-350px">
                            <span>Model:</span> <span>{t.model_name}</span>
                          </div>
                          <div className="width-350px">
                            <span>Email:</span> <span> {t.email} </span>
                          </div>
                        </div>
                        <div className="flex-wrapper-row">
                          <div className="width-350px">
                            <span>Price:</span> <span>{t.price}</span>
                            <i> $/hour</i>
                          </div>
                          <div className="width-350px">
                            <span>Number:</span> <span>{t.contact_number}</span>
                          </div>
                        </div>
                        <div className="bottom-border">
                          <i>
                            <span>Suggested Project: </span>
                            <span>{t.suggested_project}</span>
                          </i>
                          <div>
                            <button onClick={() => handleToolDetails(t)}>
                              View more
                            </button>
                            {isLoggedIn && (
                            <div className="round-border-button width-50px" onClick={()=>{handleBookingOnClick(t.tool_name,t.tool_id)}}>
                                {" "}
                                Borrow{" "}
                              </div>)}
                          </div>
                        </div>
                      </div>
                      <div className="img-magnifier-container">
                        <img id="toolimage" src={t.image_url} className="imageframe"/>
                      </div>
                    </div>
                  ))}
                </ol>
              </div>
              
            </div>
          )}
        </div>               
      </div>
    );
  }


  return (
    <Router>
      <Switch>
        <Route path="/BookingPage">
          <BookingPage />
        </Route>
        <Route path="/">
          <Try />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName,
  userId: state.userReducer.userId,
});

export default connect(mapStateToProps)(LandingPage);
