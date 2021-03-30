const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    console.log("token ", token);
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("verified user", verified_user);

    const user = db.get("user").find({ uuid: verified_user.uuid }).value();

    console.log("floolwed hashtag", user);
    res.send(user.followedhashtags);
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
});

module.exports = router;
