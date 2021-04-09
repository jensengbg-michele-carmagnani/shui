const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
// modules use
const shortid = require("shortid");

router.post("/", async (req, res) => {
  // if (!req.body.info || !req.body.hashtags) {
  //   return  res.status(204);
  // }

  // token
  const token = req.headers["authorization"].split(" ")[1];

  try {
    // verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);

    // find the user
    const user = db.get("user").find({ uuid: verified_user.uuid }).value();

    const ENCRYPTED_OWNER = CryptoJS.AES.encrypt(
      user.uuid,
      process.env.SECRET
    ).toString();
    const followedHashtags = db
      .get("user")
      .find({ uuid: verified_user.uuid })
      .get("followedhashtags")
      .push(req.body.hashtags)
      .write();
    
    
    // create the new flow
    const newflow = {
      flowId: shortid.generate(),
      date: new Date("2017-03-16T17:46:53.677").toLocaleString(),
      hashtags: req.body.hashtags.split(" "),
      info: CryptoJS.AES.encrypt(req.body.info, process.env.USERKEY).toString(),
      author: user.username,
      owner: ENCRYPTED_OWNER,
    };

    // push the flow into db
    db.get("flows").push(newflow).write();

    res.sendStatus(201);
  } catch (error) {
    res.status(400);
  }
});

module.exports = router;
