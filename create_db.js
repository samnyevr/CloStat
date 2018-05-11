const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('closet.db');

/*
	TYPES
	top
	botom
	accessory
*/

db.serialize(() =>{
  db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT ,status TEXT, tempereture TEXT, name TEXT, lastUsed TEXT, numberUsage INT)");
  db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT,email TEXT, name TEXT, location TEXT)");
  db.run("CREATE TABLE combinations(id INTEGER PRIMARY KEY AUTOINCREMENT, top INT, bottom INT accessories INT)");

  db.run("INSERT INTO items VALUES ('1','top','clean',NULL,'Blue shirt',NULL,7)");
  db.run("INSERT INTO items VALUES ('2','top','clean',NULL,'Pink Shirt',NULL,5)");
  db.run("INSERT INTO items VALUES ('3','top','clean',NULL,'Orange Tee',NULL,3)");
  db.run("INSERT INTO items VALUES ('4','top','clean',NULL,'NASA Tee',NULL,9)");
  db.run("INSERT INTO items VALUES ('5','top','clean',NULL,'UCSD Sweater',NULL,0)");
  db.run("INSERT INTO items VALUES ('6','top','clean',NULL,'Wave Hoodie',NULL,0)");
  db.run("INSERT INTO items VALUES ('7','top','clean',NULL,'Pocket Tee',NULL,4)");
  db.run("INSERT INTO items VALUES ('8','top','dirty',NULL,'Strip Tee',NULL,0)");
  db.run("INSERT INTO items VALUES ('9','top','dirty',NULL,'Track Jacket',NULL,0)");
  db.run("INSERT INTO items VALUES ('10','top','dirty',NULL,'Zip Shirt',NULL,1)");
  db.run("INSERT INTO items VALUES ('11','top','dirty',NULL,'Bomber Jacket',NULL,2)");
  db.run("INSERT INTO items VALUES ('12','top','dirty',NULL,'Biker Jacket',NULL,1)");
  db.run("INSERT INTO items VALUES ('13','top','dirty',NULL,'Zip-Up Shirt',NULL,0)");
  db.run("INSERT INTO items VALUES ('14','top','dirty',NULL,'Coach Tee',NULL,0)");

  db.run("INSERT INTO items VALUES ('15','bottom','clean',NULL,'Light Blue Jeans',NULL,0)");
  db.run("INSERT INTO items VALUES ('16','bottom','clean',NULL,'Black Sweatpant',NULL,0)");
  db.run("INSERT INTO items VALUES ('17','bottom','clean',NULL,'Corduroy Short',NULL,0)");
  db.run("INSERT INTO items VALUES ('18','bottom','dirty',NULL,'Baggies Short',NULL,0)");
  db.run("INSERT INTO items VALUES ('19','bottom','dirty',NULL,'Beige Pant',NULL,0)");

  db.run("INSERT INTO items VALUES ('20','accessory','NULL','NULL','Gold Watch',NULL,0)");
  db.run("INSERT INTO items VALUES ('21','accessory','NULL','NULL','Silver Necklace',NULL,0)");



});
