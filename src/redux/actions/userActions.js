export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_IS_LOGGED_IN',
    isLoggedIn,
});

export const setFirstName = (firstName) => ({
    type:'SET_FIRST_NAME',
    firstName,
});

export const setUserEmail = (userEmail) => ({
    type:'SET_EMAIL',
    userEmail,
});

export const setAddress = (userAddress) => ({
    type:'SET_ADDRESS',
    userAddress
});

export const setCity = (userCity) => ({
    type:'SET_CITY',
    userCity
});

export const setState = (userState) => ({
    type:'SET_STATE',
    userState
});

export const setZipCode = (userZipCode) => ({
    type:'SET_ZIPCODE',
    userZipCode
});

export const setContactNumber = (userContactNumber) => ({
    type:'SET_CONTACT_NUMBER',
    userContactNumber,
});

export const setUserId = (userId) => ({
    type:'SET_USER_ID',
    userId,
});