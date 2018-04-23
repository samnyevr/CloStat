
var data = require('../data.json');
exports.view = function(req, res){
    res.render('washing', data);
     console.log("fit the data");

};
