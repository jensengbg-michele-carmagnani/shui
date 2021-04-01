const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("./db");
const router = new Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log('TOKEN IN GET FLOWS',token)

  try {
    //verify the token
    const verify_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("VERIFY TOKEN", verify_user.uuid);
    //verify the uuid hashed  user is in the db 
    const valid_user = db.get('user').find({ uuid: verify_user.uuid }).value()
    

    if (valid_user) {
      const flows = db.get("flows").value();
      console.log("flows", flows);
      res.send(flows);
    }
  } catch (error) {
    res.sendStatus(401).send(error);
  }
});

module.exports = router;
