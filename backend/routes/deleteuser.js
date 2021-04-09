const { Router } = require("express");
const { db } = require("./db");
const router = new Router();
const jwt = require("jsonwebtoken");

router.delete("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const verified_user = jwt.verify(token, process.env.JWT_KEY);

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

    //remove user
    db.get("user").remove({ uuid: verified_user.uuid }).write();
    if (user == undefined) return res.sendStatus(404);

    res.status(200).send("User deleted");
  } catch (error) {
    res.sendStatus(401);
  }
});

module.exports = router;
