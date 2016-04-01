'use strict';

var timestampHandler = require(process.cwd() + '/app/controllers/timestampHandler.server.js');

module.exports = function (app) {
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/public/index.html');
        });
    app.route('/:date')
    	.get(function(req, res){
    		res.send(timestampHandler(req.params.date));
    	});
};