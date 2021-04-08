const db=require('./db.js')

const registerUser = (req, res) => {
    let firstName = req.body.userData.firstName;
    let lastName = req.body.userData.lastName;
    let email = req.body.userData.email;
    let address = req.body.userData.address;
    let city = req.body.userData.city;
    let state = req.body.userData.state;
    let zipcode = req.body.userData.zipcode;
    let contactNumber = req.body.userData.contactNumber;
    let password = req.body.userData.password;

    let userId = Math.round(Math.random() * 42);
    console.log("userId", userId);

    let query = `insert into users 
    (first_name, last_name, email, address, city, state, zipcode, contact_number, password) 
    values (?, ?, ?, ?, ?, ?, ?, ?, ?);`
    // con.query(query, (error, rows, colfail) => {
    //     if(error){
    //         return `this is error ${error}`
    //     }
    //     else{
    //         console.log("Success");
    //     }
    // });

    db.con.query(query, [firstName, lastName, email, address, city, state, zipcode, contactNumber, password]);
    res.send("Data received");
}

module.exports = registerUser;