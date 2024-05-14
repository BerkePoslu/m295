import express from "express";
import path from "path";
import fetch from "node-fetch";
const app = express();
const port = 3000;

app.get("/now", (req, res) => {
  res.send(new Date().toLocaleTimeString("de-CH"));
});

app.get("/zli", (req, res) => {
  res.redirect("https://www.zli.ch ");
});

app.get("/name", (req, res) => {
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

  const randomInteger = Math.floor(Math.random() * 21);

  res.send(array[randomInteger]);
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
  res.send(req.get('user-agent'));
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
