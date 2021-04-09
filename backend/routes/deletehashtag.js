const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.delete("/", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const verified_user = jwt.verify(token, process.env.JWT_KEY);

    const userHashtag = db
      .get("user")
      .find({ uuid: verified_user.uuid })
      .get("followedhashtags")
      .remove((hashtag) => hashtag == req.body.hashtag.hashtag)
      .write();

    res.send(userHashtag);
  } catch (error) {
    console.error(error);
    
    res.sendStatus(401);
  }
});

module.exports = router;
