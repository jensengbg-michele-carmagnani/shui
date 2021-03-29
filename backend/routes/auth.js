const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  
  console.log("userInfo", req.body);
  // Does user exist??
  let user = await db.get("user").find({ username: req.body.username }).value();

  // If exist
  if (user) {
    // Check PWD & compare it with the one in the db
    const valid = await bcrypt.compare(req.body.password, user.password);

    //If valid PWD
    if (valid) {
      //Decrypt  userkey
      const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
      const DECRYPTED_USER_KEY = bytes.toString(CryptoJS.enc.Utf8);

      // JWT sign with e variable JWT_KEY
      const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);
      console.log("DECRYPTED_USER", DECRYPTED_USER_KEY);
      // return JWT + KEY to frontend
      res.status(201).send({
        token: token,
        userkey: DECRYPTED_USER_KEY, // we send back this key to decrypt the my storede password
      });
    } else {
      res.status(403).send("Not data for you!");
    }
  } else {
    res.status(400).send("User or password not found!!");
  }
});
module.exports = router;
