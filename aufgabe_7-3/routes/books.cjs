const express = require("express");
const router = express.Router();
let array = require("../data/books.json");

router.use(express.json());

router.get("/", (req, res) => {
  // #swagger.summary = "Home route, returns a greeting message to the user if logged in";
  // #swagger.tags = ["Home"]
  // #swagger.description = "This route returns a greeting message to the user if logged in and a 401 status code if not logged in."
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  res.send("Hello " + req.session.user + "!");
});

router.get("/books", (req, res) => {
  // #swagger.summary = "Get all books from the books.json and return them as JSON";
  // #swagger.tags = ["Books"]
  // #swagger.description = "This route returns all books from the books.json file. If the user is not logged in, a 401 status code is returned."
  res.send(array);
});

router.get("/books/:isbn", (req, res) => {
  // #swagger.summary = "Get book by isbn from books.json and return it as JSON";
  // #swagger.tags = ["Books"]
  // #swagger.description = "This route returns a book by its isbn from the books.json file. If the user is not logged in, a 401 status code is returned."
  const isbn = parseInt(req.params.isbn);

  if (Number.isNaN(isbn)) {
    return res.status(404).send("No isbn entered!");
  }
  console.log(isbn);
  const findArray = array.find((element) => element.isbn === isbn);
  res.send(findArray);
});

router.post("/books", (req, res) => {
  // #swagger.summary = "Create book and add it to books.json and return it as JSON";
  // #swagger.tags = ["Books"]
  // #swagger.description = "This route creates a book and adds it to the books.json file. If the user is not logged in, a 401 status code is returned."
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
  // #swagger.summary = "Update book by isbn from books.json and return it as JSON";
  // #swagger.tags = ["Books"]
  // #swagger.description = "This route updates a book by its isbn from the books.json file. If the user is not logged in, a 401 status code is returned."
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
  // #swagger.summary = "Update book by isbn from books.json and return it as JSON";
  // #swagger.tags = ["Books"]
  // #swagger.description = "This route updates a book by its isbn from the books.json file. If the user is not logged in, a 401 status code is returned."
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
  // #swagger.summary = "Delete book by isbn from books.json and return it as JSON";
  // #swagger.tags = ["Books"]
  // #swagger.description = "This route deletes a book by its isbn from the books.json file. If the user is not logged in, a 401 status code is returned."
  const isbn = parseInt(req.params.isbn);
  const deleteArray = array.filter((element) => element.isbn !== isbn);
  array = deleteArray;
  return res.send(deleteArray);
});

module.exports = router;
