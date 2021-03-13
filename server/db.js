const mysql = require ('mysql');

 const con = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"tool-share"
})
exports.con=con




