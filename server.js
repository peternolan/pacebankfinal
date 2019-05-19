let http = require('http')
    , fs   = require('fs')
    , url  = require('url')
    , SqlString = require('sqlstring')
    , port = process.env.PORT || 5000
    , debug = true;
let express = require('express');
let path = require('path');
let bodyParser = require("body-parser");
let bcrypt = require('bcrypt');
let morgan = require('morgan');
const saltRounds = 10;
let app = express();
let pg = require('pg');
let client = new pg.Client();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


let pool = new pg.Pool({
    port: 5432,
    user: 'postgres',
    password: 'demon$)%^harp57',
    database: 'bankstructure',
    host: 'localhost',
    max: 10
});

pool.connect(function (err, client, done) {
    if (err) {
        return console.log(err);
    }
    else {
        client.query('SELECT * FROM customer', (err, table) => {
            if (err) {
                return console.log(err);
            }
            else {
                console.log(table.rows);
            }
        })
    }
});

app.use(morgan('dev'));

function send (res, content) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(content, 'utf-8');
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// common technique for a 'unique' alphanumeric id
function new_id() {
    return Date.now().toString(36)
}

app.get('/api/hello', (req, res) => {
    console.log("HELLO");
    res.send({ express: 'Hello From Express' });
});

app.post('/api/addUser', (req, res) => {

    var rows = req.body;

    if (debug) console.log(rows);

    let id = new_id();

    let hash = bcrypt.hashSync(rows.password, saltRounds).toString();
});

app.post('/api/login', (req, res) => {
    console.log(req.body);
    var row = req.body;
    console.log(row);
    pool.query(`SELECT username FROM customer WHERE username = '` + req.body.username + `'`, (err, results) => {
        if (err) {
            throw err
        }
        if (results.rows[0] !== undefined && results.rows[0].username === req.body.username) {
            pool.query(`SELECT password FROM customer WHERE username = '` + req.body.username + `'`, (err, results) => {
                if (err) {
                    throw err
                }
                console.log(results.rows);

                //if ( bcrypt.compareSync(row.password, results.rows[0].password) /*results.rows[0].password === req.body.password*/) {
                //var User = cookie.get('User', { signed: true });
                if (row.password === results.rows[0].password) {
                    res.end('logged in');
                } else {
                    res.end('incorrect password');
                }
            });
        } else {
            res.end('unknown username');
        }
    });
});

app.listen(port, () => console.log('Listening to port ' + port));
