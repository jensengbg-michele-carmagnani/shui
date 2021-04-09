const { Router } = require("express");
const router = new Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    // verify token
    const verified_user = jwt.verify(token, process.env.JWT_KEY);

    res.sendStatus(201);
  } catch (error) {
    res.status(401);
  }
});

module.exports = router;
