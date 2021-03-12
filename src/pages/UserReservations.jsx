import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Moment from "react-moment";
import "./userreservation.css";

const UserReservations = (userId) => {
  const [toolArray, setToolArray] = React.useState([]);
  const [review, setReview] = React.useState();
  const [ownerId, setOwnerId] = React.useState();

  React.useEffect(() => {
    const userdata = {
      userId,
    };

    axios
      .post("/api/getReservations", { userdata })
      .then((response) => {
        console.log(response);
        setToolArray(response.data);
      });
  }, []);

  const handleReviewSubmit = (tool_id) => {
    let owner_id = "";
    console.log("tool_id passed is", tool_id);
    axios
      .post("/api/gettoolowner", { tool_id })
      .then((response) => {
        console.log(response);
        owner_id = response.data[0].user_id;
        console.log("owner id is", owner_id);
        setOwnerId(response.data[0].user_id);
      });

    setTimeout(() => {
      console.log("ownerId is", ownerId);
      let reviewData = {
        userId: userId.userId,
        ownerId: "2",
        review_text: review,
        review_point: "4",
      };
      axios
        .post("/api/postreview", { reviewData })
        .then((response) => {
          console.log(response);
        });
    }, 5000);

    alert("Review submitted")
    document.getElementById("reviewtextarea1").value ="";
  };

  return (
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
                  <span>Contact Name:</span> <span>{t.contact_name}</span>
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
              </div>
              <div className="flex-wrapper-row">
                <div className="width-350px">
                  <span>Reserved from</span>{" "}
                  <Moment format="YYYY/MM/DD HH:mm">{t.start_date}</Moment>
                </div>
                <div className="width-350px">
                  <span>Until</span>{" "}
                  <Moment format="YYYY/MM/DD HH:mm">{t.end_date}</Moment>
                </div>
                <div>
                  {t.complete && (
                    <div>
                      <span className="complete-button"> Complete! </span>
                      <div className="top-margin-20px">
                        <textarea 
                          id="reviewtextarea1"
                          cols="50"
                          rows="6"
                          placeholder="Please review your experience with other community person."
                          onChange={(e) => {
                            setReview(e.target.value);
                          }}
                        />
                      </div>
                      <div>
                        {" "}
                        <button onClick={() => handleReviewSubmit(t.tool_id)}>
                          {" "}
                          Submit{" "}
                        </button>
                      </div>
                    </div>
                  )}
                  {!t.complete && (
                    <div>
                      {" "}
                      <span className="incomplete-button">
                        {" "}
                        Upcoming transaction !!{" "}
                      </span>
                      <div className="top-margin-20px">
                        {" "}
                        <i>
                          You will be able to review after transaction is done.{" "}
                        </i>
                      </div>
                    </div>
                  )}
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
  );
};

const mapStateToProps = (state) => ({
  userId: state.userReducer.userId,
});

export default connect(mapStateToProps)(UserReservations);
