const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
// modules use
const shortid = require("shortid");

router.post("/", async (req, res) => {
  console.log("body", req.body);

  // if (!req.body.info || !req.body.hashtags) {
  //   return  res.status(204);
  // }

  // token
  const token = req.headers["authorization"].split(" ")[1];
  console.log("token", token);

  try {
    // verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("verified_user", verified_user);

    // find the user
    const user = db.get("user").find({ uuid: verified_user.uuid }).value();
    console.log("user-----", user);
    const ENCRYPTED_OWNER = CryptoJS.AES.encrypt(
      user.uuid,
      process.env.SECRET
    ).toString();

    //console.log("CRYPTED_OWNER", CRYPTED_OWNER);
    // create the new flow
    const newflow = {
      flowId: shortid.generate(),
      date: new Date(),
      hashtags: req.body.hashtags,
      info: req.body.info,
      author: user.username,
      owner: ENCRYPTED_OWNER,
    };
    console.log("NEWFLOW", newflow);

  
    // push the flow into db
    db.get("flows").push(newflow).write();

    res.sendStatus(201);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
