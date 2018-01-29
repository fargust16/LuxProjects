var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://Adolmatov:A75320902394a@localhost:5432/online-library");

const query = (sql, params, callback) => {
  db.query(sql, params)
    .then((data) => {
      console.log("DATA:", data.value);
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};