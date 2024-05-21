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
  // #swagger.summary = "Login with email and password to get access to the library";
  // #swagger.tags = ["Authentication"]
  // #swagger.description = "This route logs in the user with email and password to get access to the library. If the user is already logged in, a 200 status code is returned. If the user is not logged in, a 401 status code is returned."
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authentication required");
  }

  const [email, password] = decodeHeader(authHeader);

  const storedEmailHash = process.env.EMAIL_HASH;
  const emailMatch = await bcrypt.compare(email, storedEmailHash);
  if (emailMatch) {
    const storedPasswordHash = process.env.PASSWORD_HASH;
    const passwordMatch = await bcrypt.compare(password, storedPasswordHash);
    if (passwordMatch) {
      req.session.user = email;
      return res.status(200).redirect("/");
    } else {
      res.status(401).send("Login failed (credentials do not match)");
    }
  } else {
    res.status(401).send("Login failed (credentials do not match)");
  }
});

router.get("/verify", (req, res) => {
  // #swagger.summary = "Verify if user is logged in";
  // #swagger.tags = ["Authentication"]¨
  // #swagger.description = "This route verifies if the user is logged in and returns the email of the user if logged in."
  if (req.session.user) {
    return res.status(200).send({
      email: req.session.user,
    });
  } else {
    return res.status(401).send("Not logged in");
  }
});

router.delete("/logout", (req, res) => {
  // #swagger.summary = "Logout the user from the server and delete the session cookie";
  // #swagger.tags = ["Authentication"]
  // #swagger.description = "This route logs out the user from the server and deletes the session cookie."
  logout(req);
  res.send("logged out");
});
module.exports = router;
