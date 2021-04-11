const { Router } = require("express");
const { db } = require("../db/db");
const router = new Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  
  
  // Does user exist??
  let user = await db.get("user").find({ username: req.body.username }).value();

  try {
    if (user) {
      // Check PWD & compare it with the one in the db
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
      const DECRYPTED_PW = bytes.toString(CryptoJS.enc.Utf8);
      //decrypt userkey for the frontend
      const bytes2 = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
      const DECRYPTED_USERKEY = bytes2.toString(CryptoJS.enc.Utf8);

      //If valid PWD
      if (DECRYPTED_PW == req.body.password) {
        const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY, {
          expiresIn: 900,
        });

        // return JWT + KEY to frontend
        res.status(201).send({
          token: token,
          userkey: DECRYPTED_USERKEY,
        });
      } else {
        res.status(403).send("Not data for you!");
      }
    } else {
      
      res.status(400).send("User or password not found!!");
    }
    
  } catch (error) {
    console.log(error)
  }
  // If exist
  
});
module.exports = router;
