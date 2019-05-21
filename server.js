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
app.use(bodyParser.urlencoded({extended: false}));


let pool = new pg.Pool({
    port: 5432,
    user: 'postgres',
    password: 'demon$)%^harp57',
    database: 'bankstructure',
    host: 'localhost',
    max: 10
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

//Creates UniqueID for
function new_id() {
    return new Date().getUTCMilliseconds();
}


app.post('/api/getPortfolio', (req, res) => {
    /**
     * Get the items currently held by the user.
     */
    /*
    Will be passing in the id of the current user.
     */


    var queryAddCond = 'SELECT * FROM boughtprod ' +
        'WHERE portid = ' + SqlString.escape(req.body.id);

    pool.query(queryAddCond, (err, results) => {
        if (err) {
            throw err
        }

        send(res, JSON.stringify(results.rows));

    });


});


app.post('/api/getProducts', (req, res) => {
    /**
     * First Step, get the ids of products that the user currently owns.
     * Second Step, use these ids to filter out the group total
     * third Step, produce the current amount of products.
     */

    var queryGet = '';

    if (req.body.portfolio.length > 0) {

        var str = '';

        str = str + req.body.portfolio[0].prodid;

        for (var i = 1; i < req.body.portfolio.length ; i++) {

            str = str + ", " + req.body.portfolio[i].prodid;

        }

        queryGet = 'SELECT * FROM product WHERE prodid NOT IN ( ' + str +' )';

    }
    else {
        queryGet = 'SELECT * FROM product'
    }

    pool.query(queryGet, (err, results) => {
        if (err) {
            throw err

        }

        send(res, JSON.stringify(results.rows));

    });

});

app.post('/api/getBoughtProducts', (req, res) => {

    let queryGet = 'SELECT * FROM product WHERE prodid = ' + SqlString.escape(req.body.id);

    pool.query(queryGet, (err, results) => {
        if (err) {
            throw err
        }

        send(res, JSON.stringify(results.rows));

    });

});

app.post('/api/getInvestment', (req, res) => {

    let queryGet = 'SELECT investment FROM boughtprod' +
        ' WHERE portid = ' + SqlString.escape(req.body.id) +
        ' AND prodid = ' + SqlString.escape(req.body.prodID);

    pool.query(queryGet, (err, results) => {
        if (err) {
            throw err
        }

        send(res, JSON.stringify(results.rows));

    });

});

app.post('/api/buyProduct', (req, res) => {


    if (req.body.currentInvest >= req.body.minInvest) {

        var queryAddCond = 'INSERT INTO boughtprod '
            + '(approve, portid, prodid, investment) ' +
            'SELECT true, '
            + SqlString.escape(req.body.userID) + ', '
            + SqlString.escape(req.body.id) + ', '
            + SqlString.escape(req.body.currentInvest)
            + ' WHERE NOT EXISTS ( SELECT portid, prodid FROM ' +
            'boughtprod WHERE portid = '
            + SqlString.escape(req.body.userID) + '' +
            'AND prodid = ' + SqlString.escape(req.body.id) + ' )';


        pool.query(queryAddCond, (err) => {
            if (err) {
                throw err
            }
            res.end('product added');
        });

    }
    else {
        res.end('Investment too Small.');
    }




});


app.post('/api/addUser', (req, res) => {

    var rows = req.body;

    let id = new_id();
    let newPort = new_id();

    let hash = bcrypt.hashSync(rows.password, saltRounds).toString();

    var queryAddCond = 'INSERT INTO customer '
        + '(custid, username, password, firstname, lastname, employed, salary, portfolioid, email) '
        + 'SELECT ' + SqlString.escape(id) + ', '
        +  SqlString.escape(req.body.username) + ', '
        +  SqlString.escape(hash) + ', '
        +  SqlString.escape(req.body.firstName) + ', '
        +  SqlString.escape(req.body.lastName) + ', '
        +  SqlString.escape(req.body.employed) + ', '
        +  SqlString.escape(req.body.salary) + ', '
        +  SqlString.escape(newPort) + ', '
        +  ' $1 '
        + ' WHERE NOT EXISTS ( SELECT custid FROM ' +
        'customer WHERE custid = ' + SqlString.escape(id) + ') ' +
        'RETURNING custid';

    pool.query(queryAddCond, [req.body.email], (err, results) => {
        if (err) {
            throw err
        }


        if (JSON.stringify(results.rows).length > 0) {
            var addPort = 'INSERT INTO portfolio '
                + '(id) '
                + 'SELECT ' + SqlString.escape(id);

            pool.query(addPort, (err) => {
                if (err) {
                    throw err
                }

                res.end('account created');

            });

        } else {
            res.end('username taken');
        }

});


});


app.post('/api/login', (req, res) => {

    var row = req.body;

    pool.query(`SELECT username FROM customer WHERE username = '` + req.body.username + `'`, (err, results) => {
        if (err) {
            throw err
        }
        if (results.rows[0] !== undefined && results.rows[0].username === req.body.username) {
            pool.query(`SELECT password FROM customer WHERE username = '` + req.body.username + `'`, (err, results) => {
                if (err) {
                    throw err
                }

                if ( bcrypt.compareSync(row.password, results.rows[0].password) /*results.rows[0].password === req.body.password*/) {
                //var User = cookie.get('User', { signed: true });
                //if (row.password === results.rows[0].password) {

                    pool.query(`SELECT custid FROM customer WHERE username = '` + req.body.username + `'`, (err, results) => {
                        if (err) {
                            throw err
                        }

                        send(res, JSON.stringify(results.rows));


                    });

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
