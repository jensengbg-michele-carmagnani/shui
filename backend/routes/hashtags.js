const { Router } = require("express");
const { db } = require("../db/db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    //verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
   

    const flows = db.get("flows").value();
    
   // map a new array with the only hashtag
    const hastags = flows.map((hashtag) => ( {hashtag: hashtag.hashtag} ));
    

    res.status(200).send(hastags);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
