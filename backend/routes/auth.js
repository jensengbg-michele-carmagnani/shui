const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


router.post("/login", async (req, res) => {
  console.log("userInfo", req.body);
  // Does user exist??
  let user = await db.get("user").find({ username: req.body.username }).value();

  // If exist
  if (user) {
    // Check PWD & compare it with the one in the db
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const DECRYPTED_PW = bytes.toString(CryptoJS.enc.Utf8);
    
    
    //If valid PWD
    if (DECRYPTED_PW == req.body.password) {
      
      const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);

      // return JWT + KEY to frontend
      res.status(201).send({
        token: token,
      });
    } else {
      res.status(403).send("Not data for you!");
    }
  } else {
    res.status(400).send("User or password not found!!");
  }
});
module.exports = router;
