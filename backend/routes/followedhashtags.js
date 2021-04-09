const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const verified_user = jwt.verify(token, process.env.JWT_KEY);

    const user = db.get("user").find({ uuid: verified_user.uuid }).value();

    const followed = [].concat.apply([], user.followedhashtags);
    // const followed = user.followedhashtags;

    res.send(followed);
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = router;
