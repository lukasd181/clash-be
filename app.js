require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { indexRouter } = require("./routes/index");
const { sendResponse } = require("./helpers");
const { MONGO_URI, PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URI)
  .then(console.log(`Successfully connected to db: ${MONGO_URI}`))
  .catch((err) => {
    console.log(`MongoDB Connection error: ${err}`);
  });

app.use("/api", indexRouter);

// catch 404, forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log("ERROR: ", err);
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      err.errorType,
      err.message
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      "Internal Server Error",
      err.message
    );
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
