import React from "react";
import "./registerusers.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import App from "../App";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // THIS IS NEW!!
import rootReducer from "../redux/reducers/rootReducer";
import { Provider } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
  },
  card: {
    minWidth: 275,
    backgroundColor: "khaki",
    font: "Roboto",
    fontSize: "4rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  margin: {
    margin: theme.spacing(1),
  },
  margin1:{
    marginLeft: 20,
  }
}));

const CssTextField = withStyles({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: "1.5rem",
    },
    "& label.Mui-focused": {
      color: "blue",
      fontSize: "1.5rem",
      maxWidth: "50%",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "crimson",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
      "& .MuiInputBase-input": {
        fontSize: "5rem",
        width: "50%",
      },
      "& .MuiInputBase-root": {
        width: "50%",
      },
      "& .MuiInput-root": {
        width: "50%",
      },
    },
  },
})(TextField);

export const RegisterUsers = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contactNumber, setContactNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipcode, setZipCode] = React.useState("");
  const [checked, setChecked] = React.useState(true);
  const classes = useStyles();

  const handleSubmit = async () => {
    console.log("in handle submit function");

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      city,
      state,
      zipcode,
      contactNumber: contactNumber,
      password: password,
    };
    console.log("Berry good", userData);

    await axios
      .post("/api/registerUser", { userData })
      .then((response) => {
        console.log(response);
        const res = response.data;
      });

    // ReactDOM.render(<App />,document.getElementById('root'));
    const Store = createStore(rootReducer, applyMiddleware(thunk));

    ReactDOM.render(
      <Provider store={Store}>
        <Router>
          <App />
        </Router>
      </Provider>,
      document.getElementById("root")
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-6 wrapper-register-user">
          <Card className={classes.card}>
            <CardContent className="card-display">
              <CssTextField
                className={classes.margin}
                id="first-name-input"
                label="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={firstName}
              />
              <CssTextField
                className={classes.margin}
                id="last-name-input"
                label="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={lastName}
              />
              <CssTextField
                className={classes.margin}
                id="email-input"
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <CssTextField
                className={classes.margin}
                id="address-input"
                label="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              />
              <CssTextField
                className={classes.margin}
                id="city-input"
                label="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
              />
              <CssTextField
                className={classes.margin}
                id="state-input"
                label="State"
                onChange={(e) => {
                  setState(e.target.value);
                }}
                value={state}
              />
              <CssTextField
                className={classes.margin}
                id="zipcode-input"
                label="ZipCode"
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                value={zipcode}
              />
              <CssTextField
                className={classes.margin}
                id="contact-number-input"
                label="Contact number"
                onChange={(e) => {
                  setContactNumber(e.target.value);
                }}
                value={contactNumber}
              />
              <CssTextField
                className={classes.margin}
                id="password-input"
                label="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </CardContent>
            <FormControlLabel className={classes.margin1} control={<Checkbox name="checkedC" />} label="I agree to the terms and conditions." />
            <CardActions>
              <Button size="large" onClick={handleSubmit}>
                Submit
              </Button>
            </CardActions>
            {/* <CardActions>
              <Checkbox
                checked={checked}
                // onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
                label="I agree to the terms and conditions."
              />
            </CardActions> */}
          </Card>
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

export default RegisterUsers;
