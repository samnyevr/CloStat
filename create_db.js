const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('closet.db');

/*
	TYPES
	top
	botom
	accessory
*/

db.serialize(() =>{
  db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT,type TEXT ,status TEXT, tempereture TEXT, name TEXT, lastUsed TEXT, numberUsage INT, photo TEXT, user_id INT NOT NULL)");
  db.run("CREATE TABLE users(id INTEGER PRIMARY KEY AUTOINCREMENT, password TEXT,email TEXT, name TEXT, location TEXT)");
  db.run("CREATE TABLE combinations(id INTEGER PRIMARY KEY AUTOINCREMENT, top INT, bottom INT accessories INT)");

  db.run("INSERT INTO items VALUES ('1','top','clean','hot','Blue shirt',NULL,7,'',0)");
  db.run("INSERT INTO items VALUES ('2','top','clean','hot','Pink Shirt',NULL,5,'',0)");
  db.run("INSERT INTO items VALUES ('3','top','clean','warm','Orange Tee',NULL,3,'',0)");
  db.run("INSERT INTO items VALUES ('4','top','clean','warm','NASA Tee',NULL,9,'',0)");
  db.run("INSERT INTO items VALUES ('5','top','clean','cold','UCSD Sweater',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('6','top','clean','cold','Wave Hoodie',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('7','top','clean','warm','Pocket Tee',NULL,4,'',0)");
  db.run("INSERT INTO items VALUES ('8','top','dirty','warm','Strip Tee',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('9','top','dirty','cold','Track Jacket',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('10','top','dirty','warm','Zip Shirt',NULL,1,'',0)");
  db.run("INSERT INTO items VALUES ('11','top','dirty','cold','Bomber Jacket',NULL,2,'',0)");
  db.run("INSERT INTO items VALUES ('12','top','dirty','cold','Biker Jacket',NULL,1,'',0)");
  db.run("INSERT INTO items VALUES ('13','top','dirty','warm','Zip-Up Shirt',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('14','top','dirty','hot','Coach Tee',NULL,0,'',0)");

  db.run("INSERT INTO items VALUES ('15','bottom','clean','cold','Light Blue Jeans',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('16','bottom','clean','warm','Black Sweatpant',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('17','bottom','clean','hot','Corduroy Short',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('18','bottom','dirty','hot','Baggies Short',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('19','bottom','dirty','cold','Beige Pant',NULL,0,'',0)");

  db.run("INSERT INTO items VALUES ('20','accessory','NULL','NULL','Gold Watch',NULL,0,'',0)");
  db.run("INSERT INTO items VALUES ('21','accessory','NULL','NULL','Silver Necklace',NULL,0,'',0)");

  db.run("INSERT INTO users VALUES (0,'password','test@test.com','TestUser','San Diego')");



});
