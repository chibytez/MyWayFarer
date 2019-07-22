import db from '../model/database';


db.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, 
          email VARCHAR(40) NOT NULL,
         first_name VARCHAR(40) NOT NULL,
         last_name VARCHAR(40) NOT NULL,
         password VARCHAR(80),
         is_admin BOOLEAN NOT NULL)`, (err, res) => {
  if (err) {
    return err;
  }
});

db.query(`CREATE TABLE IF NOT EXISTS trip(id SERIAL PRIMARY KEY,
          bus_id SERIAL, 
          origin VARCHAR(40),
          destination VARCHAR (40),
          trip_date date NOT NULL DEFAULT CURRENT_DATE,
          fare NUMERIC(10,2),
          status VARCHAR(40) NOT NULL)`, (err, res) => {
    if (err){
        return err;
    }
});

db.query(`CREATE TABLE IF NOT EXISTS bus(id SERIAL PRIMARY KEY,
                                      number_plate VARCHAR(40), 
                                      manufacturer VARCHAR(40),
                                      model VARCHAR(40),
                                      capacity NUMERIC(10,2))`,
                                       (err, res) => {
  if (err){
    return err;
}
});

db.query(`CREATE TABLE IF NOT  EXISTS booking(id SERIAL PRIMARY KEY,
                                              trip_id INTEGER NOT NULL REFERENCES trip(id) ON DELETE CASCADE,
                                             user_id INTEGER,
                                             seat_number INTEGER , 
                                             created_on date NOT NULL DEFAULT CURRENT_DATE)`,
    (err, res) => {
  if (err){
    return err;
}
});
