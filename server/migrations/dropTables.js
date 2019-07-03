import db from '../model/database';

db.query('DROP TABLE users', (err, res) => {
  if (err) {
    return err;
  }
});
