import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const SaveStory = ({ userId }) => {
  console.log("in save story component, userId is", userId);
  const [storyArray, setStoryArray] = React.useState([]);

  React.useEffect(() => {
    console.log("save story useEffect");
    const saveData = {
      userId
    };
    axios
      .post("/api/getsavedstory", { saveData })
      .then(response => {
        console.log(response);
        setStoryArray(response.data);
      });
  }, []);

  return (
    <div>
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
                  {/* <button onClick={() => handleEditStory(s)}>
                    Edit story
                  </button> */}
                </div>
              </div>
            </div>
            <div>
              {/* `${s.image_url}` */}
              <img
                src={s.image_url}
                className="imageframe"
              />
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

export default connect(mapStateToProps)(SaveStory);
