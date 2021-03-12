const mysql = require ('mysql');

const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})

const Login = (req, res) => {
    // con.connect(function(err){
    //     if(err) throw err;
    //     console.log("Connected !!")
    // });

    console.log("login server");
    console.log(req.body.authData);

    let email = req.body.authData.email;
    let password = req.body.authData.password;
    
    let query = `select users_id, first_name, last_name, email, address, city, state, zipcode, contact_number from users where email=? and password=?`;

    con.query(query, [email, password], (error, result, field)=>{
        if(error){
            console.log('here if', error);
            res.send(`error in selecting user from users table ${error}`);
        }
        else{
            console.log('here else', result);
            // console.log("result user id", result[0].users_id);
            if(result[0]){
                res.send(result);
            }
            else{
                res.send("not registered user");
            }
        }
    });
    // res.send("Data received");
    // con.end();
}

module.exports = Login;