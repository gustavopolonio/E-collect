import express from "express";
import nunjucks from "nunjucks";
import { db } from "./database/db.js";


const server = express();
const port = 3000;
server.use(express.json());
server.use(express.urlencoded({ extend: true }));

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

server.post('/savepoint', (request, response) => {
  console.log(request.body);

  // Insert data in database
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `;

  const values = [
    request.body.image,
    request.body.name,
    request.body.address,
    request.body.address2,
    request.body.state,
    request.body.city,
    request.body.items
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Inserted data successfully.");
    return response.send("Hello");
  }

  db.run(query, values, afterInsertData);
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