const { Router } = require("express");
const router = new Router();
const { db } = require("./db");

// module required
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const shortid = require("shortid");

router.post("/", async (req, res) => {
  const credential = req.body;
  console.log("NewUser", credential);

  if (req.body.username && req.body.password) {
    // hash pwd with bcrypt
    const ENCRYPTED_PW = await bcrypt.hash(req.body.password, 10);
    //generate userkey
    const USER_KEY = shortid.generate();
    
 
    // encrypt USER_KEY & SECRET with CryptoJS
    const ENCRYPTED_USER_KEY = CryptoJS.AES.encrypt(
      USER_KEY, // "Messsagge"  generate by shortid.generate()
      process.env.SECRET // "Secret Passphrase" environment variable
    ).toString();

    console.log("after encrypted_user_key", ENCRYPTED_USER_KEY);
      console.log("ENCRYPTED_USER_KEY", ENCRYPTED_USER_KEY);
    let user = {
      uuid: shortid.generate(),
      username: req.body.username,
      password: ENCRYPTED_PW, // hashed with bycrypt module
      userkey: ENCRYPTED_USER_KEY, // encrypted with with CryptoJS & the {obj} contain the USER_KEY(generate by shortid module) + env SECRET
      followedhashtags: [],
    };
    console.log("User created", user);

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
