import express from "express";
import path from "path";
import fetch from "node-fetch";
import fs from "fs";
const app = express();
const port = 3000;

app.use(express.json());
const array = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emma",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
  "Katherine",
  "Liam",
  "Mia",
  "Nathan",
  "Olivia",
  "Peter",
  "Quinn",
  "Rachel",
  "Samuel",
  "Taylor",
];

app.get("/now", (req, res) => {
  const timezone = req.query.tz;
  console.log(timezone);
  res.send(new Date().toLocaleTimeString("de-CH", { timeZone: timezone }));
});

app.get("/zli", (req, res) => {
  res.redirect("https://www.zli.ch ");
});

app.get("/names", (req, res) => {
  const randomInteger = Math.floor(Math.random() * 21);

  res.send(array[randomInteger]);
});

app.post("/names", (req, res) => {
  if (!req.body.name) {
    return res.status(400).send("Ohnananana");
  }
  const name = req.body.name;

  array.push(name);

  res.send(`Submitted name: ${name},\nArray: ${array}`);
});

app.delete("/names", (req, res) => {
  const name = req.query.name;

  const deletedArray = array.filter((word) => word !== name);

  res.send(`Deleted name: ${name}\nArray: ${deletedArray}`);
});

app.get("/secret2", (req, res) => {
  const auth = req.headers.authorization;
  const authToken = "Basic aGFja2VyOjEyMzQ=";

  if (auth === authToken) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get("/chuck", (req, res) => {
  const url = "https://api.chucknorris.io/jokes/random";

  const name = req.query.name;

  function getValue(name) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("erroorrrr");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.value);
        let value = data.value;
        value = value.replace("Chuck Norris", name);
        res.send(value);
      });
  }
  getValue(name);
});

app.patch("/me", (req, res) => {
  const __dirname = import.meta.dirname;
  const data = req.body;
  const filePath = path.resolve(__dirname, "me.json");

  fs.writeFile(filePath, JSON.stringify(data), () => {
    res.sendFile(filePath);
  });
});

app.get("/html", (req, res) => {
  const __dirname = import.meta.dirname;
  const filePath = path.resolve(__dirname, "index.html");
  res.sendFile(filePath);
});

app.get("/image", (req, res) => {
  const __dirname = import.meta.dirname;
  const filePath = path.resolve(__dirname, "image.png");
  res.sendFile(filePath);
});

app.get("/teapot", (req, res) => {
  res.sendStatus(418);
});

app.get("/user-agent", (req, res) => {
  res.send(req.get("user-agent"));
});

app.get("/secret", (req, res) => {
  res.sendStatus(403);
});

app.get("/xml", (req, res) => {
  const __dirname = import.meta.dirname;
  const filePath = path.resolve(__dirname, "note.xml");
  res.sendFile(filePath);
});

app.get("/me", (req, res) => {
  const __dirname = import.meta.dirname;
  const filePath = path.resolve(__dirname, "me.json");
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Endpoints app listening on port ${port}`);
});
