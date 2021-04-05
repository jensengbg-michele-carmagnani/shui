const { Router } = require("express");
const router = new Router();
const jwt = require("jsonwebtoken");


router.get("/", async (req, res) => {
  console.log("body", req.body);

  const token = req.headers["authorization"].split(" ")[1];
  console.log("token", token);

  try {
    // verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);
    console.log("verified_user", verified_user);

    res.sendStatus(201);
  } catch (error) {
    res.status(401);
  }
});

module.exports = router;
