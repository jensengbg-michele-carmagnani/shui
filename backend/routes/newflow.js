const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");
// modules use
const shortid = require("shortid");

router.post("/", (req, res) => {
  console.log("body", req.body);

  if (!req.body.info || !req.body.hashtag) {
    return  res.send("No content ");
  }

  // token
  let token = req.headers["authorization"].split(" ")[1];
  console.log("token", token);

  try {


    // verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log('verified_user',verified_user)
      
    // find the user
    const user = db.get("user").find({ uuid: verified_user.uuid }).value();
    console.log("user", user);
    // create the new flow
    let newflow = {
      flowId: shortid.generate(),
      date: new Date(),
      hashtag: req.body.hashtag,
      info: req.body.info,
      author: user.username,
    };

    console.log('newFlow', newflow)
    // push the flow into db
    db.get("flows").push(newflow).write();

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400).send(error);
  }
});

module.exports = router;
