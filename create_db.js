const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('closet.db');

db.serialize(() =>{
  db.run("CREATE TABLE tops (id INT PRIMARY KEY, status TEXT, tempereture TEXT, name TEXT, lastUsed TEXT, numberUsage INT)");
  db.run("CREATE TABLE bottoms (id INT PRIMARY KEY, status TEXT, tempereture TEXT, name TEXT, lastUsed TEXT, numberUsage INT)");
  db.run("CREATE TABLE accessories (id INT PRIMARY KEY,  name TEXT, lastUsed TEXT, numberUsage INT)");
  db.run("CREATE TABLE users(id INT PRIMARY KEY, password TEXT,email TEXT, name TEXT, location TEXT)");
  db.run("CREATE TABLE combinations(id INT PRIMARY KEY, top INT, bottom INT accessories INT)");

  db.run("INSERT INTO tops VALUES ('1','clean',NULL,'Blue shirt',NULL,0)");
  db.run("INSERT INTO tops VALUES ('2','clean',NULL,'Pink Shirt',NULL,0)");
  db.run("INSERT INTO tops VALUES ('3','clean',NULL,'Orange Tee',NULL,0)");
  db.run("INSERT INTO tops VALUES ('4','clean',NULL,'NASA Tee',NULL,0)");
  db.run("INSERT INTO tops VALUES ('5','clean',NULL,'UCSD Sweater',NULL,0)");
  db.run("INSERT INTO tops VALUES ('6','clean',NULL,'Wave Hoodie',NULL,0)");
  db.run("INSERT INTO tops VALUES ('7','clean',NULL,'Pocket Tee',NULL,0)");
  db.run("INSERT INTO tops VALUES ('8','dirty',NULL,'Strip Tee',NULL,0)");
  db.run("INSERT INTO tops VALUES ('9','dirty',NULL,'Track Jacket',NULL,0)");
  db.run("INSERT INTO tops VALUES ('10','dirty',NULL,'Zip Shirt',NULL,0)");
  db.run("INSERT INTO tops VALUES ('11','dirty',NULL,'Bomber Jacket',NULL,0)");
  db.run("INSERT INTO tops VALUES ('12','dirty',NULL,'Biker Jacket',NULL,0)");
  db.run("INSERT INTO tops VALUES ('13','dirty',NULL,'Zip-Up Shirt',NULL,0)");
  db.run("INSERT INTO tops VALUES ('14','dirty',NULL,'Coach Tee',NULL,0)");

  db.run("INSERT INTO bottoms VALUES ('1','clean',NULL,'Light Blue Jeans',NULL,0)");
  db.run("INSERT INTO bottoms VALUES ('2','clean',NULL,'Black Sweatpant',NULL,0)");
  db.run("INSERT INTO bottoms VALUES ('3','clean',NULL,'Corduroy Short',NULL,0)");
  db.run("INSERT INTO bottoms VALUES ('4','dirty',NULL,'Baggies Short',NULL,0)");
  db.run("INSERT INTO bottoms VALUES ('5','dirty',NULL,'Beige Pant',NULL,0)");



});