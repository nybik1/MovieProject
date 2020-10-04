const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./server/config/key");
const path = require("path");

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true, limit: '4mb', parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '4mb' }));
app.use(cookieParser());

app.use('/api/users', require('./server/routes/users'));
app.use('/api/comment', require('./server/routes/comment'));
app.use('/api/like', require('./server/routes/like'));
app.use('/api/favorite', require('./server/routes/favorite'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});