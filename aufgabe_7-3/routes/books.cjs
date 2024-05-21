const express = require("express");
const router = express.Router();
let array = require("../data/books.json");

router.use(express.json());

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  res.send("Hello " + req.session.user + "!");
});

router.get("/books", (req, res) => {
  res.send(array);
});

router.get("/books/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);

  if (Number.isNaN(isbn)) {
    return res.status(404).send("No isbn entered!");
  }
  console.log(isbn);
  const findArray = array.find((element) => element.isbn === isbn);
  res.send(findArray);
});

router.post("/books", (req, res) => {
  if (!req.body) {
    return res.status(400).send("No book data provided");
  }

  const { isbn, title, year, author } = req.body;

  if (!isbn || !title || !year || !author) {
    return res.status(422).send("Incomplete book data");
  }

  const allowedFields = ["isbn", "title", "year", "author"];
  const additionalFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );
  if (additionalFields.length > 0) {
    return res
      .status(422)
      .send(`Prohibited fields found: ${additionalFields.join(", ")}`);
  }

  const postArray = [...array, { isbn, title, year, author }];

  array = postArray;

  return res.send(postArray);
});

router.put("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const bookIndex = array.findIndex((element) => element.isbn === isbn);

  if (bookIndex !== -1) {
    const allowedFields = ["isbn", "title", "year", "author"];
    const additionalFields = Object.keys(req.body).filter(
      (key) => !allowedFields.includes(key)
    );
    if (additionalFields.length > 0) {
      return res
        .status(422)
        .send(`Prohibited fields found: ${additionalFields.join(", ")}`);
    }
    array[bookIndex] = { ...array[bookIndex], ...req.body };

    res.send(array[bookIndex]);
  } else {
    res.status(404).send("No book found!");
  }
});

router.patch("/books/:isbn", (req, res) => {
  try {
    const isbn = parseInt(req.params.isbn);
    const bookIndex = array.findIndex((element) => element.isbn === isbn);
    if (bookIndex !== -1) {
      array[bookIndex] = { ...array[bookIndex], ...req.body };

      res.send(array[bookIndex]);
    } else {
      res.status(404).send("No book found!");
    }
  } catch {
    return res.status(404).send("No isbn entered!");
  }
});

router.delete("/books/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const deleteArray = array.filter((element) => element.isbn !== isbn);
  array = deleteArray;
  return res.send(deleteArray);
});

module.exports = router;
