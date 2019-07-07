import db from '../model/database';

db.query('DROP TABLE users', (err, res) => {
  if (err) {
    return err;
  }
});

db.query('DROP TABLE bus', (err, res) => {
  if (err) {
    return err;
  }
});

db.query('DROP TABLE trip', (err, res) => {
  if (err) {
    return err;
  }
});
