const mongoose = require("mongoose");
const secrets = require("../secrets/secrets");

const connect = (app) => {
  const Options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  mongoose.set("useFindAndModify", false);
  mongoose.connect(secrets.connection, Options);
  mongoose.connection
    .once("open", function () {
      console.log("Connected to Mongo DB");
      app.listen(5000, () => console.log("Listening to port 5000"));
    })
    .on("error", function (error) {
      console.log("Connection to Mongo Failed: " + error);
    });
};

module.exports = { connect };
