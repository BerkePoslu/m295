const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const array = [
  {
    isbn: "978-3-16-148410-0",
    title: "Die Verwandlung",
    year: 1915,
    author: "Franz Kafka",
  },
  {
    isbn: "978-0-330-25864-4",
    title: "1984",
    year: 1949,
    author: "George Orwell",
  },
  {
    isbn: "978-3-596-19071-9",
    title: "Die Blechtrommel",
    year: 1959,
    author: "Günter Grass",
  },
  {
    isbn: "978-0-451-52493-3",
    title: "To Kill a Mockingbird",
    year: 1960,
    author: "Harper Lee",
  },
  {
    isbn: "978-0-14-118260-5",
    title: "Catch-22",
    year: 1961,
    author: "Joseph Heller",
  },
  {
    isbn: "978-3-462-02953-2",
    title: "Der Steppenwolf",
    year: 1927,
    author: "Hermann Hesse",
  },
  {
    isbn: "978-3-518-10236-3",
    title: "Die unendliche Geschichte",
    year: 1979,
    author: "Michael Ende",
  },
  {
    isbn: "978-0-14-028333-1",
    title: "Harry Potter and the Philosopher's Stone",
    year: 1997,
    author: "J.K. Rowling",
  },
  {
    isbn: "978-0-06-112008-4",
    title: "The Alchemist",
    year: 1988,
    author: "Paulo Coelho",
  },
  {
    isbn: "978-3-462-03530-4",
    title: "Stein der Geduld",
    year: 2008,
    author: "Atiq Rahimi",
  },
  {
    isbn: "978-3-423-13514-1",
    title: "Tschick",
    year: 2010,
    author: "Wolfgang Herrndorf",
  },
  {
    isbn: "978-3-596-18962-1",
    title: "Krabat",
    year: 1971,
    author: "Otfried Preußler",
  },
  {
    isbn: "978-3-312-00264-8",
    title: "Per Anhalter durch die Galaxis",
    year: 1979,
    author: "Douglas Adams",
  },
  {
    isbn: "978-3-492-21425-3",
    title: "Das Parfum",
    year: 1985,
    author: "Patrick Süskind",
  },
  {
    isbn: "978-3-499-24310-1",
    title: "Der Schwarm",
    year: 2004,
    author: "Frank Schätzing",
  },
  {
    isbn: "978-3-462-03053-8",
    title: "Die Päpstin",
    year: 1996,
    author: "Donna W. Cross",
  },
  {
    isbn: "978-3-257-23011-0",
    title: "Siddhartha",
    year: 1922,
    author: "Hermann Hesse",
  },
  {
    isbn: "978-3-257-06782-0",
    title: "Der Vorleser",
    year: 1995,
    author: "Bernhard Schlink",
  },
  {
    isbn: "978-3-518-41167-7",
    title: "Das Schicksal ist ein mieser Verräter",
    year: 2012,
    author: "John Green",
  },
  {
    isbn: "978-3-596-51129-6",
    title: "Momo",
    year: 1973,
    author: "Michael Ende",
  },
  {
    isbn: "978-3-462-00003-3",
    title: "Der kleine Prinz",
    year: 1943,
    author: "Antoine de Saint-Exupéry",
  },
];
const lendArray = [
  {
    id: 1,
    customer_id: 101,
    isbn: "978-3-16-148410-0",
    borrowed_at: "2024-05-15T10:30:00",
    returned_at: null,
  },
  {
    id: 2,
    customer_id: 102,
    isbn: "978-3-16-148411-1",
    borrowed_at: "2024-05-14T09:45:00",
    returned_at: "2024-05-16T11:20:00",
  },
  {
    id: 3,
    customer_id: 103,
    isbn: "978-3-16-148412-2",
    borrowed_at: "2024-05-13T14:20:00",
    returned_at: null,
  },
  {
    id: 4,
    customer_id: 104,
    isbn: "978-3-16-148413-3",
    borrowed_at: "2024-05-12T11:10:00",
    returned_at: null,
  },
  {
    id: 5,
    customer_id: 105,
    isbn: "978-3-16-148414-4",
    borrowed_at: "2024-05-11T08:00:00",
    returned_at: "2024-05-13T13:45:00",
  },
];

app.get("/books", (req, res) => {
  res.send(array);
});

app.get("/books/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);

  if (isbn === NaN) {
    return res.status(404).send("No isbn entered!");
  }
  console.log(isbn);
  const findArray = array.find((element) => element.isbn === isbn);
  res.send(findArray);
});

app.post("/books", (req, res) => {
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

  return res.send(postArray);
});

app.put("/books/:isbn", (req, res) => {
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

app.patch("/books/:isbn", (req, res) => {
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

app.delete("/books/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const deleteArray = array.filter((element) => element.isbn !== isbn);
  res.send(deleteArray);
});

app.get("/lends", (req, res) => {
  res.send(lendArray);
});

app.get("/lends/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const findArray = lendArray.find((element) => element.id === id);
  console.log(lendArray);
  res.send(findArray);
});

app.post("/lends", (req, res) => {
  if (!req.body) {
    return res.status(400).send("no lend");
  }

  const lend = req.body;

  console.log(req.body);

  if (lend) {
    const uuid = crypto.randomUUID();
    const updatedlend = { id: uuid, ...lend };
    const postArray = [...lendArray, updatedlend];
    return res.send(postArray);
  } else {
    return res.sendStatus(422);
  }
});

app.delete("/lends/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);

  const findArray = lendArray.find((element) => element.id === id);
  if (!findArray) {
    return res.status(404).send("Lend not found");
  }

  const date = new Date();
  const formattedDate = date.toISOString();

  findArray.returned_at = formattedDate;

  return res.send(findArray);
});

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`);
});
