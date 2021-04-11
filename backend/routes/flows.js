const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("../db/db");
const router = new Router();
const CryptoJS = require("crypto-js");

router.get("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    //verify the token
    const verify_user = jwt.verify(token, process.env.JWT_KEY);

    //verify the uuid hashed  user is in the db
    const user = db.get("user").find({ uuid: verify_user.uuid }).value();

    // function for filtering the flows with the hashtags followed by the user
    const filterFlow = (flow) => {
      const filteredHashtags = flow.hashtags.filter((hashtag) =>
        user.followedhashtags.includes(hashtag)
      );
      return filteredHashtags.length > 0;
    };

    // if there'is some followed hashtags then we use the filterFlow
    if (user.followedhashtags.length > 0) {
      const flows = db.get("flows").value().filter(filterFlow);
      const allFlows = db.get("flows").value();
      
      res.send({ flows, allFlows });
    } else {
      const allFlows = db.get("flows").value();
      const flows = db.get("flows").value();

      res.send({ flows, allFlows });
    }
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = router;
