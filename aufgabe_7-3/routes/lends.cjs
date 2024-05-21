const express = require("express");
const router = express.Router();
let lendArray = require("../data/lends.json");

router.get("/lends", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  res.send(lendArray);
});

router.get("/lends/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  const id = parseInt(req.params.id);
  console.log(id);
  const findArray = lendArray.find((element) => element.id === id);
  console.log(lendArray);
  res.send(findArray);
});

router.post("/lends", (req, res) => {
  if (!req.body) {
    return res.status(400).send("no lend");
  }

  const lend = req.body;

  console.log(req.body);

  if (lend) {
    const uuid = crypto.randomUUID();
    const updatedlend = { id: uuid, ...lend };
    const postArray = [...lendArray, updatedlend];
    lendArray = postArray;
    return res.send(postArray);
  } else {
    return res.sendStatus(422);
  }
});

router.delete("/lends/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  const id = parseInt(req.params.id);
  console.log(id);

  const findArray = lendArray.find((element) => element.id === id);
  if (!findArray) {
    return res.status(404).send("Lend not found");
  }

  const date = new Date();
  const formattedDate = date.toISOString();

  findArray.returned_at = formattedDate;

  lendArray = findArray;

  return res.send(findArray);
});

module.exports = router;
