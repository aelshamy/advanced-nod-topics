var pg = require('pg');

var connectionString = 'postgres://gack@localhost/postgres';

var client = new pg.Client(connectionString);

pg.connect(function(err) {
    if (err) { throw err; }
    client.query('SELECT NOW() AS "The Time"', function(err, result) {
        if (err) { throw err; }
        console.log(result.rows[0]);

        client.end();
    });
});