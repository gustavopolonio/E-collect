// Import sqlite3 dependecy
import sqlite3 from "sqlite3";

const sqlite3Verbose = sqlite3.verbose();
// Create object that will operate the database and opening connection
const db = new sqlite3Verbose.Database("./src/database/database.db", (err) => {
  if (err) {
    console.error(err.message);
  }

  console.log("Connected with the database.");
});

  db.serialize(() => {
    // Create table
    db.run(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT,
        name TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
      );
    `);


    const query = `
      INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      )
      VALUES (?,?,?,?,?,?,?);
    `
    const values = [
      "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cmVjeWNsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      "Papersider",
      "Guilhemre Botelho, Jardim América",
      "N° 260",
      "Rio do Sul",
      "Santa Catarina",
      "Paper and Carboard"
    ];

    function afterInsertData(err) {
      if (err) {
        return console.error(err.message);
      }

      console.log("Isert data successfully.");
      console.log(this);
    }
    
    // Insert data from table
    // db.run(query, values, afterInsertData);

    // Query data from table
    // db.all(`SELECT * FROM places`, function(err, rows) {
    //   if (err) {
    //     throw err;
    //   }

    //   console.log("Your data are bellow:");
    //   console.log(rows);
    // })

    // Delete data from table
    // db.run(`DELETE FROM places WHERE id = ?`, 1, function(err) {
    //   if (err) {
    //     return console.log(err);
    //   }

    //   console.log("Delete successfully");
    //   console.log(this);
    // })

  });




db.close((err) => {
  if (err) {
    console.error(err.message);
  }

  console.log("Close the database connection.");
})