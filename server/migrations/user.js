import db from '../model/database';
import bcrypt from 'bcryptjs';


let values = ['is_admin', 'is_admin', 'chibuifkebyke@gmail.com',bcrypt.hashSync('Chibyke8%', 10), 'true'];
   let user =  db.query('INSERT into users(first_name, last_name, email, password, is_admin)VALUES($1,$2,$3,$4,$5)', values);

 values = ['becky', 'uwah', 'beckyuwah@gmail.com', bcrypt.hashSync('Chibyke8%', 10), 'false'];
    user =  db.query('INSERT into users(first_name, last_name, email, password, is_admin)VALUES($1,$2,$3,$4,$5)', values);