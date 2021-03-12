const INITIAL_STATE = {
  firstname: "",
  isLoggedIn: false,
  userEmail: "",
  userAddress: "",
  userCity: "",
  userState: "",
  userZipCode: "",
  userContactNumber: "",
  userId: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };

    case "SET_FIRST_NAME":
      return {
        ...state,
        firstName: action.firstName
      };

    case "SET_EMAIL":
      return {
        ...state,
        userEmail: action.userEmail
      };

    case "SET_ADDRESS":
      return {
        ...state,
        userAddress: action.userAddress
      };

    case "SET_CONTACT_NUMBER":
      return {
        ...state,
        userContactNumber: action.userContactNumber
      };

    case "SET_CITY":
      return {
        ...state,
        userCity: action.userCity
      };

    case "SET_STATE":
      return {
        ...state,
        userState: action.userState
      };

    case "SET_ZIPCODE":
      return {
        ...state,
        userZipCode: action.userZipCode
      };

    case "SET_USER_ID":
      return {
        ...state,
        userId: action.userId
      }
    default:
      return state;
  }
};

export default userReducer;
