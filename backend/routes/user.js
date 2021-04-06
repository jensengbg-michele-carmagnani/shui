const { Router } = require("express");
const router = new Router();
const { db } = require("./db");

// module required
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const shortid = require("shortid");

router.post("/", async (req, res) => {
  const credential = req.body;


  if (req.body.username && req.body.password) {
    let unavailable = db
      .get("user")
      .find({ username: req.body.username })
      .value();

    if (unavailable) 
      return res
        .status(403)
        .send("Username is already in use!! Try another one...");
    
    // hash pwd with bcrypt
    const ENCRYPTED_PW =  CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString();

    //generate userkey
    


  
  

    let user = {
      uuid: shortid.generate(),
      username: req.body.username,
      password: ENCRYPTED_PW, // hashed with bycrypt module
      followedhashtags: [],
    };
  

    // Add user to db 'user'
    await db.get("user").push(user).write();

    //send back the a message to user
    res.status(201).send(`User added`);
  } else {
    res
      .status(400)
      .send("Whoops! Did you really entered the right credetials??");
  }
});
module.exports = router;
