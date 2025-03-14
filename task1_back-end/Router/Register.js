const router = require('express').Router()
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
const saltPassword = 10;

router.post('/register', async (req,res) => {
    const q = "INSERT INTO user (`username`,`email`,`password`) VALUES (?)"
const password = req.body.password
const encryptPassword = await bcrypt.hash(password,saltPassword)
    const value = [req.body.name, req.body.email, encryptPassword]
    db.query(q,[value],(err,data) => {
        if(err && err.code == 'ER_DUP_ENTRY'){
            res.json("User already exists. Please use a different email.")
        }else{
            res.json('User was registered...!')
        }
    })
})


module.exports = router;