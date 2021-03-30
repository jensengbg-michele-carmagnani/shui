const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    //verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("Verified", verified_user);

    const flows = db.get("flows").value();
    console.log("Flows", flows);
   // map a new array with the only hashtag
    const hastags = flows.map((hashtag) => ( {hashtag: hashtag.hashtag} ));
    console.log("hastags", hastags);

    res.status(200).send(hastags);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
