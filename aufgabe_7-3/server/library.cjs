const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");
const session = require("express-session");

const auth = require("../routes/auth.cjs");
const lends = require("../routes/lends.cjs");
const books = require("../routes/books.cjs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("../frontend"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use("/", auth);
app.use("/", lends);
app.use("/", books);

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`);
});
