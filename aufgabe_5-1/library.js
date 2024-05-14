import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

const array = [
  {
      "isbn": "978-3-16-148410-0",
      "title": "Die Verwandlung",
      "year": 1915,
      "author": "Franz Kafka"
  },
  {
      "isbn": "978-0-330-25864-4",
      "title": "1984",
      "year": 1949,
      "author": "George Orwell"
  },
  {
      "isbn": "978-3-596-19071-9",
      "title": "Die Blechtrommel",
      "year": 1959,
      "author": "Günter Grass"
  },
  {
      "isbn": "978-0-451-52493-3",
      "title": "To Kill a Mockingbird",
      "year": 1960,
      "author": "Harper Lee"
  },
  {
      "isbn": "978-0-14-118260-5",
      "title": "Catch-22",
      "year": 1961,
      "author": "Joseph Heller"
  },
  {
      "isbn": "978-3-462-02953-2",
      "title": "Der Steppenwolf",
      "year": 1927,
      "author": "Hermann Hesse"
  },
  {
      "isbn": "978-3-518-10236-3",
      "title": "Die unendliche Geschichte",
      "year": 1979,
      "author": "Michael Ende"
  },
  {
      "isbn": "978-0-14-028333-1",
      "title": "Harry Potter and the Philosopher's Stone",
      "year": 1997,
      "author": "J.K. Rowling"
  },
  {
      "isbn": "978-0-06-112008-4",
      "title": "The Alchemist",
      "year": 1988,
      "author": "Paulo Coelho"
  },
  {
      "isbn": "978-3-462-03530-4",
      "title": "Stein der Geduld",
      "year": 2008,
      "author": "Atiq Rahimi"
  },
  {
      "isbn": "978-3-423-13514-1",
      "title": "Tschick",
      "year": 2010,
      "author": "Wolfgang Herrndorf"
  },
  {
      "isbn": "978-3-596-18962-1",
      "title": "Krabat",
      "year": 1971,
      "author": "Otfried Preußler"
  },
  {
      "isbn": "978-3-312-00264-8",
      "title": "Per Anhalter durch die Galaxis",
      "year": 1979,
      "author": "Douglas Adams"
  },
  {
      "isbn": "978-3-492-21425-3",
      "title": "Das Parfum",
      "year": 1985,
      "author": "Patrick Süskind"
  },
  {
      "isbn": "978-3-499-24310-1",
      "title": "Der Schwarm",
      "year": 2004,
      "author": "Frank Schätzing"
  },
  {
      "isbn": "978-3-462-03053-8",
      "title": "Die Päpstin",
      "year": 1996,
      "author": "Donna W. Cross"
  },
  {
      "isbn": "978-3-257-23011-0",
      "title": "Siddhartha",
      "year": 1922,
      "author": "Hermann Hesse"
  },
  {
      "isbn": "978-3-257-06782-0",
      "title": "Der Vorleser",
      "year": 1995,
      "author": "Bernhard Schlink"
  },
  {
      "isbn": "978-3-518-41167-7",
      "title": "Das Schicksal ist ein mieser Verräter",
      "year": 2012,
      "author": "John Green"
  },
  {
      "isbn": "978-3-596-51129-6",
      "title": "Momo",
      "year": 1973,
      "author": "Michael Ende"
  },
  {
      "isbn": "978-3-462-00003-3",
      "title": "Der kleine Prinz",
      "year": 1943,
      "author": "Antoine de Saint-Exupéry"
  }
]


app.get('/books', (req, res) => {
  res.send(array);
});

app.get('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn
  const findArray = array.find((element) => element.isbn === isbn)
  res.send(findArray);
});

app.post('/books', (req, res) => {
    if (!req.body) {
      return res.status(400).send("no book");
    }
  
    const book = req.body;

    console.log(req.body);

    if (book) {
      const postArray = [...array, book]
      return res.send(book); 
    } else {
      return res.sendStatus(422);
    }
  });

app.listen(port, () => {
  console.log(`Library app listening on port ${port}`);
});