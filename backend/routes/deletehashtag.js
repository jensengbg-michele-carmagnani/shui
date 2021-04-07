const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.delete("/", async (req, res) => {

  console.log("remove this hashtag ", req.body.hashtag.hashtag);

  const token = req.headers["authorization"].split(" ")[1];

  try {
    console.log("token ", token);
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("verified user in delete hashtag", verified_user);

    const userHashtag = db
      .get("user")
      .find({ uuid: verified_user.uuid })
      .get("followedhashtags")
      .remove((hashtag) => hashtag == req.body.hashtag.hashtag)
      .write();

    console.log("DELETEHASHTAG", userHashtag);
    res.send(userHashtag);
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
});

module.exports = router;
