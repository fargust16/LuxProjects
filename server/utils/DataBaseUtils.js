var query = require('../db/connect');

const authUser = (username, password, callback) => {
  let params = ['*', 'users', username, password];
  query('SELECT $1:name FROM $2:name WHERE username = $3:name and password = $4:name', params, function(err, result) {
    callback(err, result);
  });
}