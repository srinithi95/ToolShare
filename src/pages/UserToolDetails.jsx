import React from "react";
import axios from "axios";
import ToolMap from "./ToolMap";
import BookingPage from "./BookingPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";

const UserToolDetails = (propTool,store) => {
  const [toolArray, setToolArray] = React.useState([]);
  const [toolFound, setToolFound] = React.useState(false);
  const [searchTool, setSearchTool] = React.useState("");
  const[toolCoordinatesArray, setToolCoordinatesArray]= React.useState([])

  React.useEffect(() => {
    console.log(propTool.tool)

    document.getElementById("tool-searchbar").value = propTool.tool;
    const data = {
      toolName: propTool.tool,
      
    };
    axios
      .post("/api/usertooldetails", { data })
      .then(response => {
        console.log(response);
        if (response.data.length > 0) {
          console.log("tool found");
          
          setToolArray(response.data);
          
          setToolFound(true);
        } else {
          console.log("tool not found");

          // axios.get("http://localhost:3000/getTool").then(response => {
          //   // console.log(response.data);
          //   setToolArray(response.data);
          // });
        }
      });
     
      if(!toolFound){
        const searchData = {
          searchTool: propTool.tool,
        };
    
        axios
          .post("http://localhost:3000/api/searchTool", { searchData })
          .then(response => {
            console.log("serarch resu",response.data);
            setToolArray(response.data);
          });
      }
  }, []);
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
    
  }, [toolArray]);
  const handleBookingOnClick =(toolname,toolId)=>{
    const state=  {
      toolname: toolname,
      toolId: toolId,
    }
 ReactDOM.render(<BookingPage state={state} />, document.getElementById("xyz"));
  }
  

  const handleSearchTool = () => {
    console.log("in handle search story");
    //should be post request
    const searchData = {
      searchTool
    };

    axios
      .post("http://localhost:3000/api/searchTool", { searchData })
      .then(response => {
        console.log(response.data);
        setToolArray(response.data);
      });
  };
  console.log("Tool array",toolArray)

  

  
  return (
    <div className="story-wrapper">
      {toolFound && (
        <div>
          <ol>
            {toolArray.map(t => (
              <div>
                <b>{t.tool_name}</b>
                <div className="flex-wrapper-row">
                  <div className="width-500px">
                    <span>Make:</span> <span>{t.make}</span>
                  </div>
                  <div className="width-500px">
                    <span>Contact Name:</span> <span>{t.contact_name}</span>
                  </div>
                </div>
                <div className="flex-wrapper-row">
                  <div className="width-500px">
                    <span>Model:</span> <span>{t.model_name}</span>
                  </div>
                  <div className="width-500px">
                    <span>Email:</span> <span> {t.email} </span>
                  </div>
                </div>
                <div className="flex-wrapper-row">
                  <div className="width-500px">
                    <span>Price:</span> <span>{t.price}</span>
                  </div>
                  <div className="width-500px">
                    <span>Number:</span> <span>{t.contact_number}</span>
                  </div>
                </div>
                <div className="bottom-border">
                  <i>
                    <span>Suggested Project: </span>
                    <span>{t.suggested_project}</span>
                  </i>
                </div>
                <div>
                  <img src={t.image_url} className="imageframe" />
                </div>
                <div className="round-border-button width-50px" onClick={()=>{handleBookingOnClick(t.tool_name,t.tool_id)}}>
                                {" "}
                                Borrow{" "}
                              </div>
              </div>
            ))}
          </ol>
        
        <div>
        <ToolMap coordinates={toolCoordinatesArray}/>
      </div>
      </div>
      )}

      {!toolFound && (
        <div>
          <p> Sorry the tool<b> {propTool.tool} </b>  is not posted by anyone yet. </p>
          <div>You can search for any other tool below </div>
          
          <div>
            <div className="align-centre1 inside-wrapper">
              <div className="font-size-20">
                <b> Tools </b>
              </div>
            </div>

            {/* Search bar in tools */}
            <div className="align-centre1 inside-wrapper">
              <div>
                <input
                  type="text"
                  onChange={e => {
                    setSearchTool(e.target.value);
                  }}
                  id="tool-searchbar"
                />
              </div>
              <div>
                <button onClick={handleSearchTool}> Find tools </button>
              </div>
            </div>
          </div>

          {/* Display all tools using array */}
          <div>
            <ol>
              {toolArray.map(t => (
                <div>
                <div>
                  <b>{t.tool_name}</b>
                  <div className="flex-wrapper-row">
                    <div className="width-500px">
                      <span>Make:</span> <span>{t.make}</span>
                    </div>
                    <div className="width-500px">
                      <span>Contact Name:</span>{" "}
                      <span>{t.contact_name}</span>
                    </div>
                  </div>
                  <div className="flex-wrapper-row">
                    <div className="width-500px">
                      <span>Model:</span> <span>{t.model_name}</span>
                    </div>
                    <div className="width-500px">
                      <span>Email:</span> <span> {t.email} </span>
                    </div>
                  </div>
                  <div className="flex-wrapper-row">
                    <div className="width-500px">
                      <span>Price:</span> <span>{t.price}</span>
                    </div>
                    <div className="width-500px">
                      <span>Number:</span> <span>{t.contact_number}</span>
                    </div>
                  </div>
                  
                  <div className="bottom-border">
                    <i>
                      <span>Suggested Project: </span>
                      <span>{t.suggested_project}</span>
                    </i>
                    
                  </div>
                </div>
                <div>
                 <div className="round-border-button width-50px" onClick={()=>{handleBookingOnClick(t.tool_name,t.tool_id)}}>
                                {" "}
                                Borrow{" "}
                              </div>
                          
                          </div>
                <div>
                  <img src={t.image_url} className="imageframe" />
                </div>
              </div>
              ))}
            </ol>
          </div>
        </div>
      )}
      
           
    </div>
  );
  
};



export default UserToolDetails;
