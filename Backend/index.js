const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors')
const registerRoute = require('./Router/Register')
const loginRoute = require('./Router/Login')
const dotenv = require('dotenv')

dotenv.config()


const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})
app.use(express.json())
app.use(cors())

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL");
    }
});
app.use('/auth',registerRoute)
app.use('/auth', loginRoute)

app.get('/user', (req,res) => {
    const q = "SELECT * FROM Auth_user.users"
    db.query(q,(err, data) => {
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
// app.get('/test', (req,res) => {
//     res.send("hello")
// })


app.listen(process.env.PORT, () => {
    console.log('Backend is running...!')
})