const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const router = express.Router();

dotenv.config();

function decodeHeader(authHeader) {
  const base64 = authHeader.split(" ")[1];
  const encryptedbase64 = atob(base64);
  return encryptedbase64.split(":");
}

function logout(req) {
  req.session.destroy();
}

router.post("/login", async (req, res) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required");
  }

  const [email, password] = decodeHeader(authHeader);
  console.log(email);
  console.log(password);

  const storedEmailHash = process.env.EMAIL_HASH;
  const emailMatch = await bcrypt.compare(email, storedEmailHash);
  console.log(emailMatch);
  if (emailMatch) {
    const storedPasswordHash = process.env.PASSWORD_HASH;
    console.log(storedPasswordHash);
    const passwordMatch = await bcrypt.compare(password, storedPasswordHash);
    console.log(passwordMatch);
    if (passwordMatch) {
      req.session.user = email;
      console.log(req.session.user);
      return res.status(200).redirect("/");
    } else {
      res.status(401).send("Login failed (credentials do not match)");
    }
  } else {
    res.status(401).send("Login failed (credentials do not match)");
  }
});

router.get("/verify", (req, res) => {
  if (req.session.user) {
    return res.status(200).send({
      email: req.session.user,
    });
  } else {
    return res.status(401).send("Not logged in");
  }
});

router.delete("/logout", (req, res) => {
  logout(req);
  res.send("logged out");
});
module.exports = router;
