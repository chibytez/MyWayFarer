import db from '../model/database';


const values = [1, 'Enu-103','toyota', '2018 model', 16];
   let account =  db.query('INSERT into bus(id, number_plate, manufacturer,model,capacity)VALUES($1,$2,$3,$4,$5)', values);


   const value = [2, 'Enu-102', 'toyota', '2019 model', 16];
    account =  db.query('INSERT into bus(id, number_plate, manufacturer,model,capacity)VALUES($1,$2,$3,$4,$5)', value);