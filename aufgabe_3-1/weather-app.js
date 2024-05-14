import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
const port = 3000;


app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'frontend')));

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/weather", (req, res) => {
  const zipcode = req.query.zip;
  let url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zipcode}00`;

  function fetchData() {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("errorrrrrrrrrr");
        }
        return response.json();
      })
      .then((data) => {
        // modifiedData = data.get(currentWeather)
        res.send(data.currentWeather);
      });
  }

  fetchData();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
