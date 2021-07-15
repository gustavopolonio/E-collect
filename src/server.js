import express from "express";
import nunjucks from "nunjucks";
import { db } from "./database/db.js";


const server = express();
const port = 3000;

nunjucks.configure('src/views/', {
  noCache: true,
  express: server
})

server.use(express.static("public"));

server.get('/', (request, response) => {
  return response.render("index.html");
})

server.get('/create-point', (request, response) => {
  return response.render("create-point.html");
})

server.get('/search', (request, response) => {

  // Query data from table places
  db.all(`SELECT * FROM places`, function(err, rows) {
    if (err) {
      console.log(err);
    }

    const totalPlaces = rows.length;

    return response.render("search-results.html", { places: rows, total: totalPlaces });
  })

})


server.listen(port, () => {
  console.log("Listening server!")
})