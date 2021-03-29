const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const { jwt } = require("jsonwebtoken");

router.get("/", (req, res) => {

  // const token = req.headers["authorization"].split(" ")[1];
  // const verified_user = jwt.verify(token, process.env.JWT_KEY);
  // // if not verify unauthorized request
  // if (!verified_user) return res.sendStatus(401);

  try {
    const hastag = db.get("flows").filter("hashtag").value();
    console.log("hashtag", hastag);
    res.send(hastag);
    
  } catch (error) {
    res.sendStatus(404).send(error)
  }
});

module.exports = router;
