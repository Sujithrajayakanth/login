const router = require("express").Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.post("/login", async (req, res) => {
  const q = "SELECT * FROM user WHERE email = ?";

  db.query(q, [req.body.email], async (err, data) => {
    if (err) return res.status(500).json({ error: "Database error", details: err });

    if (data.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = data[0]; //data[0] is get the user
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful"});// show the user use (users)
  });
});

module.exports = router;
