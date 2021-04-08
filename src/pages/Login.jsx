import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { setUserId, setIsLoggedIn, setFirstName, setAddress, setCity, setState, setZipCode, setUserEmail, setContactNumber } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Redirect, NavLink} from 'react-router-dom';
import {RegisterUsers} from "./RegisterUsers.jsx";
import ReactDOM from "react-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center"
  },
  card: {
    minWidth: 275,
    backgroundColor: "khaki",
    font: "Roboto",
    fontSize: "4rem"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const CssTextField = withStyles({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: "1.5rem"
    },
    "& label.Mui-focused": {
      color: "blue",
      fontSize: "1.5rem",
      maxWidth: "50%"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red"
      },
      "&:hover fieldset": {
        borderColor: "crimson"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      },
      "& .MuiInputBase-input": {
        fontSize: "5rem",
        width: "50%"
      },
      "& .MuiInputBase-root": {
        width: "50%"
      },
      "& .MuiInput-root": {
        width: "50%"
      }
    }
  }
})(TextField);

export const Login = ({dispatch, isLoggedIn }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const classes = useStyles();

  const handleRegister = () => {
    console.log("in handle register");
    ReactDOM.render(<RegisterUsers />, document.getElementById('root'));
  }

  const handleLogin = async () => {
    console.log("in handle login");

    const authData = {
      email,
      password
    };
    console.log("Berry good", authData);

    await axios
      .post("/api/auth", { authData })
      .then(response => {
        const res = response.data;
        console.log("response", response);
        console.log("Response.data", response.data);
        // console.log("Length", res.length());
        if (res === "not registered user") {
          alert("Go make an account first");
        } 
        else {
          let userId = res[0].users_id;
          console.log("User id is", userId);
          dispatch(setUserId(userId));
          console.log("before dispatch", res[0])
          dispatch(setIsLoggedIn(true));
          let firstName = res[0].first_name;
          let email = "spandya@mail.sfsu.edu"//res[0].email;
          let password="qwe"//res[0].password";
          dispatch(setFirstName(firstName));
          dispatch(setUserEmail(email));
          dispatch(setAddress(res[0].address));
          dispatch(setContactNumber(res[0].contact_number));
          dispatch(setCity(res[0].city));
          dispatch(setState(res[0].state));
          dispatch(setZipCode(res[0].zipcode));
          //var expires = (new Date(Date.now()+ 86400*1000)).toUTCString();
          var expires=100
          document.cookie = `email=${email} ; expires=${expires}`;
          document.cookie = `password=${password}`;
          // alert("Welcome user:", userId)
        }
      });
  };

  if(isLoggedIn){
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col-6 wrapper-register-user">
          <Card className={classes.card}>
            <CardContent className="card-display">
              <CssTextField
                className={classes.margin}
                id="email-input"
                label="Email"
                onChange={e => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <CssTextField
                className={classes.margin}
                id="password-input"
                label="Password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
              />
            </CardContent>
            <CardActions>
              <Button size="large" onClick={handleLogin}>
                Login
              </Button>
            </CardActions>
            <CardActions>
              <Button size="large" onClick={handleRegister}>
                Register a new Account
              </Button>
            </CardActions>
            <CardActions>
              <Button size="large">
                Forgot Password
              </Button>
            </CardActions>
          </Card>
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  firstName: state.userReducer.firstName
});

export default connect(mapStateToProps)(Login);
