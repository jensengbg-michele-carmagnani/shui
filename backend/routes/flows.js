const { Router } = require("express");
const { jwt } = require("jsonwebtoken");
const { db } = require("./db");
const router = new Router();

router.get("/", (req, res) => {
  
  // const token = req.headers["authorization"].split(" ")[1];
  // const verify_user = jwt.verify(token, process.env.JWT_KEY);

  // if (!verify_user) return res.sendStatus(401);

  try {
    const flows = db.get("flows").value();
    console.log("flows", flows);
    res.send(flows);
  } catch (error) {
    send.sendStatus(400).send(error);
  }
});

module.exports = router;
