'use strict';
const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const books = require('./books.json');
const recentBooks = require('./recentBooks.json');
const users = require('./users.json');

//const authUser = require('./utils/DataBaseUtils');

const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://Adolmatov:A75320902394a@localhost:5432/online-library");

const sha512 = require('js-sha512');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// to parse .json
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/books', (req, res) => {

    let struct = {
        columns: ['b.book_id', 'b.title', 'g.genre', 'b.isbn', 'b.release_date', 'b.description', 'b.text', 'b.cover',
            'b.topics']
    };

    db.query('SELECT bg.*, r.reviews ' +
        'FROM (SELECT b.id, b.title, g.genre, b.isbn, b.release_date, b.description, ' +
        'b.text, b.cover, b.topics FROM books as b, genres as g WHERE b.genre_id = g.id) bg ' +
        ' LEFT JOIN ' +
        '   ( SELECT book_id, array_to_json(array_agg(row_to_json(reviews))) as reviews FROM  reviews ' +
        '   GROUP BY book_id ) r ' +
        ' ON bg.id = r.book_id ', struct)
        .then(data => {
            res.send(data);
            //console.log(data);
        })
        .catch(error => {
            res.status(400).send(Error(error));
            console.log(Error(error));
        })
});

app.put('/books/add-book', (req, res) => {
    const {title, author, genre, isbn, releaseDate, description, text, cover, topics, userId} = req.body;

    let params = {
        table: 'books',
        columns: ['book_id', 'title', 'author', 'fk_genre', 'isbn', 'release_date', 'description', 'text', 'cover', 'topics', 'fk_uploaded_by'],
        values: ['default', title, author, genre, isbn, releaseDate, description, text, cover, topics, userId]
    };

    db.one('INSERT INTO books(${columns:name}) VALUES (${values:name}) RETURNING book_id', params)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(400).send(Error(error));
            console.log(Error(error));
        })
});

app.get('/books/view/:id', (req, res) => {

    let struct = {
        bookId: req.params.id,
        columns: ['b.book_id', 'b.title', 'g.genre', 'b.isbn', 'b.release_date', 'b.description', 'b.text', 'b.cover',
            'b.topics']
    };

    db.one('SELECT bg.*, reviews, comments ' +
        'FROM ( SELECT b.*, g.genre FROM books as b, genres as g WHERE b.genre_id = g.id ) as bg ' +
        '    LEFT JOIN ' +
        '    ( SELECT book_id, array_to_json(array_agg(row_to_json(reviews))) as reviews ' +
        '      FROM reviews ' +
        '      GROUP BY book_id ' +
        '    ) rev ' +
        '    ON bg.id = rev.book_id ' +
        '    LEFT JOIN ' +
        '    ( SELECT bc.book_id, ' +
        '        array_to_json( ' +
        '            array_agg( ' +
        '              ( SELECT row_to_json(data) ' +
        '                FROM (select bc.id, bc.text, bc.post_date, u.username as author) as data ' +
        '              ) ' +
        '            ) ' +
        '        ) as comments ' +
        '     FROM users as u, book_comments as bc ' +
        '     WHERE u.id = bc.user_id ' +
        '     GROUP BY bc.book_id ' +
        '    ) bcu ' +
        '    ON bg.id = bcu.book_id ' +
        'WHERE bg.id = ${bookId:value}', struct)
        .then(data => {
            res.send(data);
            //console.log(data);
        })
        .catch(error => {
            res.status(400).send(Error(error));
            //console.log(error);
        })
});

app.put('/books/add-comment', (req, res) => {
    const {book_id, user_id, comment_text} = req.body;
    let params = {
        user_id,
        book_id,
        text: comment_text
    };

    db.one('INSERT INTO book_comments(id, user_id, book_id, text, post_date) ' +
        '    VALUES (default, ${user_id:value}, ${book_id:value}, \'${text:value}\', default) RETURNING id', params)
        .then(data => {
            res.send(data);
            //console.log(data);
        })
        .catch(error => {
            res.status(400).send(Error(error));
            //console.log(error);
        })
});

app.get('/books/recent/:id', (req, res) => {

    db.query('SELECT rec.view_date, ' +
        '   array_to_json( ' +
        '     array_agg( ' +
        '       ( SELECT row_to_json(data) ' +
        '         FROM (select b.id, b.title, b.author, b.cover, b.description, rec.view_date, rev.reviews) as data ' +
        '        ) ' +
        '     ) ' +
        '   ) as books ' +
        ' FROM users as u, recent_views as rec, books as b ' +
        '  LEFT JOIN ' +
        '    (SELECT array_to_json(array_agg(r)) as reviews, b.id as book_id ' +
        '     FROM books as b, reviews as r ' +
        '     WHERE b.id = r.book_id ' +
        '     GROUP BY b.id ' +
        '    ) rev ' +
        '  ON rev.book_id = b.id ' +
        'WHERE u.id = rec.user_id AND b.id = rec.book_id ' +
        'GROUP BY u.id, rec.view_date ' +
        'HAVING u.id = ${id:value}', req.params)
        .then(data => {
            res.send(data);
            //console.log(data);
        })
        .catch(error => {
            res.status(400).send(Error(error));
            console.log(Error(error));
        })

});

app.put('/books/add-recent', (req, res) => {
    const {book_id, user_id} = req.body;
    let params = {
        user_id,
        book_id
    };

    db.one('INSERT INTO recent_views(id, user_id, book_id, view_date) ' +
        '    VALUES (default, ${user_id:value}, ${book_id:value}, default) RETURNING id', params)
        .then(data => {
            res.send(data);
            //console.log(data);
        })
        .catch(error => {
            res.status(400).send(Error(error));
            //console.log(error);
        })
});

app.get('/books/read/:id', (req, res) => {
    res.send(books[req.params.id]);
});

app.post('/users', (req, res) => {
    const {email, password} = req.body;

    let params = ['*', 'users', email];
    db.query('SELECT $1:name FROM $2:name WHERE username LIKE \'%$3:value%\'', params)
        .then((data) => {
            let dataTemp = data.find(el => el);
            params.push(sha512(dataTemp.salt + password));
            //console.log(params)
            db.query('SELECT $1:name FROM $2:name WHERE username LIKE \'%$3:value%\' and password LIKE \'%$4:value%\'', params)
                .then((nextData) => {
                    res.send(nextData[0]);
                    //console.log(nextData[0]);
                })
                .catch((nextError) => {
                    res.send(nextError);
                    //console.log(error);
                });
        })
        .catch((error) => {
            res.send(error);
        });
});

app.put('/add-user', (req, res) => {
    const {email, password, salt} = req.body;

    let params = ['users', email, password, salt];

    db.one('INSERT INTO $1:name(' +
        'id, username, password, salt) ' +
        'VALUES (default, \'$2:value\', \'$3:value\', \'$4:value\')', params)
        .then((data) => {
            res.send(data);
            //console.log(data);
        })
        .catch((error) => {
            res.send(error);
            //console.log(error);
        });
});

app.post('/update-user-username', (req, res) => {
    const {id, password, newEmail} = req.body;
    let params = ['users', id, password, newEmail],
        customQuery = 'UPDATE $1:name SET username=\'$4:value\' WHERE id=\'$2:value\' and password=\'$3:value\'';

    db.query(customQuery, params)
        .then(() => {
            db.one('SELECT * FROM $1:name WHERE id=\'$2:value\' and password=\'$3:value\'', params)
                .then((data) => {
                    res.send(data);
                    //console.log(data);
                })
                .catch((error) => {
                    let customErr = error;
                    customErr.received = 'username';
                    res.send(customErr);
                    console.log(customErr);
                });
        })
        .catch((err) => {
            res.send(err);
            //console.log(err);
        });


});

app.post('/update-user-password', (req, res) => {
    const {id, password, newPassword} = req.body;

    let pass = newPassword.password,
        salt = newPassword.salt,
        params = ['users', id, password, pass, salt],
        customQuery = 'UPDATE $1:name SET password=\'$4:value\', salt=\'$5:value\' WHERE id=\'$2:value\' and password=\'$3:value\' ';

    db.query(customQuery, params)
        .then(() => {
            db.one('SELECT * FROM $1:name WHERE id=\'$2:value\' and password=\'$4:value\'', params)
                .then((data) => {
                    res.send(data);
                    //console.log(data);
                })
                .catch((error) => {
                    let customErr = error;
                    customErr.received = 'password';
                    res.send(customErr);
                    console.log(customErr);
                });
        })
        .catch((err) => {
            res.send(err);
            //console.log(err);
        });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});