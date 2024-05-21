import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

function decodeHeader(authHeader) {
  const base64 = authHeader.split(" ")[1];
  const encryptedbase64 = atob(base64);
  return encryptedbase64.split(":");
}

app.get("/public", (req, res) => {
  res.send("Hello World!");
});

app.get("/private", async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required");
  }
  const [username, password] = decodeHeader(authHeader);

  if (username === "zli") {
    const storedHash = process.env.PASSWORD_HASH;
    console.log(storedHash);
    const passwordMatch = await bcrypt.compare(password, storedHash);
    if (passwordMatch) {
      res.send("Hello Private World!");
    } else {
      res.status(401).send("Forbidden");
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
