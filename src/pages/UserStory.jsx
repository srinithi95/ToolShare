import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import EditStory from "../pages/EditStory";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   NavLink
// } from "react-router-dom";
import ReactDOM from "react-dom";

const UserStory = ({ userId }) => {
  console.log("in user story component, userId is", userId);
  const [storyArray, setStoryArray] = React.useState([]);

  React.useEffect(() => {
    console.log("user story useEffect");
    const saveData = {
      userId
    };
    axios
      .post("/api/getuserstory", { saveData })
      .then(response => {
        console.log(response);
        setStoryArray(response.data);
      });
  }, []);

  const handleEditStory = s => {
    console.log("in edit story");
    ReactDOM.render(<EditStory story={s} />, document.getElementById("pqr"));
  };

  return (
    <div id="pqr">
      <ol>
        {storyArray.map(s => (
          <div className="postingframe">
            <div className="width500px">
              <b>{s.posting_title}</b>
              <div>
                <span>Description:</span> <span>{s.description}</span>
              </div>
              <div>
                <span>Tools:</span> <span>{s.tool}</span>
              </div>
              <div>
                <span>Materials:</span> <span>{s.material}</span>
              </div>
              <div>
                <span>Category:</span> <span>{s.category}</span>
              </div>
              <div className="bottom-border">
                <i>
                  <span>Tag:</span> <span>{s.tag}</span>
                </i>
                <div>
                  <button onClick={() => handleEditStory(s)}>Edit story</button>
                </div>
              </div>
            </div>
            <div>
              {/* `${s.image_url}` */}
              <img src={s.story_image_url} className="imageframe" />
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.userReducer.userId
});

export default connect(mapStateToProps)(UserStory);
