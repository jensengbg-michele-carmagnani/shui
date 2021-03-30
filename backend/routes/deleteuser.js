const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.delete("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log("token", token);
  try {
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("verified user", verified_user);

    let user = db.get("user").find({ uuid: verified_user.uuid }).value();
    let flows = db
      .get("flows")
      .filter({ author: user.username })
      .forEach((flow) => {
        {
          flow.author = "Anonymous";
        }
      })
      .write();
     console.log("Anonymous flow", flows);
    // let newFlows = flows.map((flow) => ({
    //   flowId: flow.flowId,
    //   hashtag: flow.hashtag,
    //   info: flow.info,
    //   author: "anonymous",
    // }));
    // console.log("newflows", newFlows);
    // let filterd = db
    //   .get("flows")
    //   .filter({ author: user.username })
    //   .assign(newFlows)
    //   .write();
    // console.log("filtered", filterd);

    //remove user
    db.get("user").remove({ uuid: verified_user.uuid }).write();
    if (user == undefined) return res.sendStatus(404);

    res.status(200).send("User deleted");
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = router;
