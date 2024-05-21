const express = require("express");
const router = express.Router();
let lendArray = require("../data/lends.json");

router.get("/lends", (req, res) => {
  // #swagger.summary = "Get all lends from the lend.json and return them as JSON";
  // #swagger.tags = ["Lends"]
  // #swagger.description = "This route returns all lends from the lend.json file. If the user is not logged in, a 401 status code is returned."
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  res.send(lendArray);
});

router.get("/lends/:id", (req, res) => {
  // #swagger.summary = "Get lend by id from lend.json and return it as JSON";
  // #swagger.tags = ["Lends"]
  // #swagger.description = "This route returns a lend by its id from the lend.json file. If the user is not logged in, a 401 status code is returned."
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  const id = parseInt(req.params.id);
  const findArray = lendArray.find((element) => element.id === id);
  res.send(findArray);
});

router.post("/lends", (req, res) => {
  // #swagger.summary = "Create lend and add it to lend.json and return it as JSON";
  // #swagger.tags = ["Lends"]
  // #swagger.description = "This route creates a lend and adds it to the lend.json file. If the user is not logged in, a 401 status code is returned."
  if (!req.body) {
    return res.status(400).send("no lend");
  }

  const lend = req.body;

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
  // #swagger.summary = "Delete lend by id from lend.json and return it as JSON";
  // #swagger.tags = ["Lends"]
  // #swagger.description = "This route deletes a lend by its id from the lend.json file. If the user is not logged in, a 401 status code is returned."
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  const id = parseInt(req.params.id);

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
