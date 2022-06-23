
const express = require('express');
const app = express();
const mysql = require("mysql2");

let dbparameters = {
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'mumbai',
	port: 3306
};
const conn = mysql.createConnection(dbparameters)

app.use(express.static('abc'));

app.get('/check', function (req, res) {
	let output = { status: false, row: {} };
	let inid = req.query.id;
	conn.query("select * from book where bookid=?", [inid], (err, rows) => {
		if (err) {
			console.log("error in database connection");
			output = err;
		}
		if (rows.length > 0) {
			output.status = true;
			output.row = rows[0];
			console.log("Connected to database, and got required row");
		} else {
			console.log("Connected to database, but row not acquired");
		}
		res.send(output);
	});
});



app.get('/update', function (req, res) {
	let output = { status: false };
	let inid = req.query.id;
	let inprice = req.query.price
	conn.query("update book set price=? where bookid=?", [inprice, inid], (err, result) => {
		if (err) {
			console.log("error in database connection");
			output = err;
		}
		if (result.affectedRows > 0) {
			output.status = true;
			console.log("Connected to database, and updated row");
		} else {
			console.log("Connected to database, but no row updated");
		}
		res.send(output);
	});
});



app.listen(8081, function () {
	console.log("server listening at port 8081...");
});