import React from "react";
import axios from "axios";

const UserToolDetails = propTool => {
  const [toolArray, setToolArray] = React.useState([]);
  const [toolFound, setToolFound] = React.useState(false);
  const [searchTool, setSearchTool] = React.useState(propTool.tool[0]);

  React.useEffect(() => {

    document.getElementById("tool-searchbar").value = propTool.tool[0];

    const data = {
      toolName: propTool.tool[0],
      userId: propTool.tool[1]
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
          searchTool: propTool.tool[0],
        };
    
        axios
          .post("http://localhost:3000/api/searchTool", { searchData })
          .then(response => {
            console.log(response.data);
            setToolArray(response.data);
          });
      }
  }, []);

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
              </div>
            ))}
          </ol>
        </div>
      )}

      {!toolFound && (
        <div>
          <b>Unforunately, the user didn't put the tool to be shared.</b>
          <div> You can search for the tools here....</div>
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
                    <div>
                      {/* <button onClick={() => handleToolDetails(t)}>
                        {" "}
                        View more
                      </button> */}
                    </div>
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
