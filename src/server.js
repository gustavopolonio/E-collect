import express from "express";
import nunjucks from "nunjucks";

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
  return response.render("search-results.html");
})


server.listen(port, () => {
  console.log("Listening server!")
})