const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const App = express();

//require moduls
const auth = require("./routes/auth");
const user = require("./routes/user");
const flows = require("./routes/flows");
const newflow = require("./routes/newflow");
const hashtags = require("./routes/hashtags");
const followedhashtags = require("./routes/followedhashtags");
// const lckd =  require('./routes/lckd')

App.use(helmet());
App.use(express.json());
App.use(cors());

// routes
App.use("/auth", auth);
App.use("/user", user);
App.use("/flows", flows);
App.use("/newflow", newflow);
App.use("/hashtags", hashtags);
App.use("/followedhashtags", followedhashtags);
// App.use('/lckd', lckd)

App.listen(3000, () => {
  console.log("The server is running at port 3000");
});
