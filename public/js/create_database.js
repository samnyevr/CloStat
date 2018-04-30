// database stuffs

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('pets.db');

db.seralize(() =>{
  db.run("CREATE TABLE users_to_pets (name TEXT, job TEXT, pet TEXT)");
  db.run("INSERT INTO users_to_pets VALUES('Philip', 'professor', 'cat.jpg')");

  db.each("SELECT name, job, pet FROM users_to_pets", (err,row) =>{});
});

db.close();
