const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("./db");
const router = new Router();
const CryptoJS = require("crypto-js");

router.get("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log("TOKEN IN GET FLOWS", token);

  try {
    //verify the token
    const verify_user = jwt.verify(token, process.env.JWT_KEY);

    //verify the uuid hashed  user is in the db
    const user = db.get("user").find({ uuid: verify_user.uuid }).value();

    console.log("USER IN FLOW", user.followedhashtags);
    // function for filtering the flows with the hashtags followed by the user
    const filterFlow = (flow) => {
      const filteredHashtags = flow.hashtags.filter((hashtag) =>
        user.followedhashtags.includes(hashtag)
      );
      console.log("FILTEREDHASHTAG IN FLOW", filteredHashtags);
      return filteredHashtags.length > 0;
    };
    console.log("user ", user.followedhashtags);
    // if there'is some followed hashtags then we use the filterFlow
    if (user.followedhashtags.length > 0) {
      const flows = db.get("flows").value().filter(filterFlow);
      // flows.forEach((flow) => {
      //   let bytes = CryptoJS.AES.decrypt(flow.info, process.env.SECRET);
      //   let text = bytes.toString(CryptoJS.enc.Utf8);
      //   flow.info = text;
      // });
      const allFlows = db.get("flows").value();
      console.log("FLOWS.JS AFTER FILTERED FUNCTION ", flows);
      res.send({ flows, allFlows });
    } else {
      const allFlows = db.get("flows").value();
      const flows = db.get("flows").value();
      // allFlows.forEach((flow) => {
      //   let bytes = CryptoJS.AES.decrypt(flow.info, process.env.SECRET);
      //   let text = bytes.toString(CryptoJS.enc.Utf8);
      //   flow.info = text;
      // });
      res.send({flows,allFlows});
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401).send(error);
  }
});

module.exports = router;
