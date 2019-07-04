
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

import { signUpValidation, loginValidation} from '../helper/validation/userValidation';

import db from '../model/database';

class UserController{

/**
  *
  * @method signUp
  * @description controller for the sign up api endpoint
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof UserController
  */
 static async signUp (req, res) {
   try {
    const {
      firstName, lastName, email, password,
    } = req.body;
   
    const validation = new Validator({
      firstName, lastName, password, email,
    }, signUpValidation);
  
    validation.passes( async() => { 
      if(!password.match(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/)){
        return res.status(201).json({
          message: 'password must contain a capital letter,small letter,number and special character',
        })
      }
      
      const sql = {
        text: 'SELECT * FROM users WHERE email= $1',
        values: [email],
      };
  
      const result = await db.query(sql, [email]);
  
        if (result.rows.length > 0) {
          return res.status(409).json({
            errors: {
              message: ['Email already exists'],
            },
          });
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async(err, hash) => { 
            const sql = {
              text:
                'INSERT INTO users(email, firstName, lastName, password, admin) VALUES($1, $2, $3, $4, $5) RETURNING *',
              values: [email, firstName,lastName, hash, false],
            };
            const userResult = await db.query(sql);
  
              jwt.sign({ user: userResult.rows[0].id,admin:userResult.rows[0].admin}, process.env.SECRET_KEY, (err, token) => 
               res.status(201).json({
                success: true,
                status: '201',
                message: 'user registration was successful',
                data: {
                  id:userResult.rows[0].id,
                  firstName: userResult.rows[0].firstname,
                  lastName: userResult.rows[0].lastname,
                  email,
                  admin:userResult.rows[0].admin,
                },
                token,
              }))
          });
        });
     
    });
    validation.fails(() => {
      res.status(400).json(validation.errors);
    });
   } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message,
    });
   }
  
}

/**
  *
  * @method login
  * @description controller for the login api endpoint
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof UserController
  */
 static async login (req, res) {
  try {
    const { email, password } = req.body; 
    const validation = new Validator({ password, email }, loginValidation);
    validation.passes(async() => {
      const sql = {
        text: 'SELECT * FROM users WHERE email= $1',
        values: [email],
      };
      const result = await db.query(sql)
          if (result && result.rows.length === 1) {
            bcrypt.compare(password, result.rows[0].password, async(error, match) => {
              if (match) {
                if (result && result.rows.length === 1) {
                  delete result.rows[0].password;
                  
                  jwt.sign({ user: result.rows[0].id, admin:result.rows[0].admin, cashier:result.rows[0].type}, process.env.SECRET_KEY, (err, token) =>
                    res.status(201).json({
                    success: true,
                    message: 'user successful login',
                    data: result.rows[0],
                    token,
                  }));
                } 
                else {
                  res.status(400).json({
                    success: false,
                    message: 'Your email or password is incorrect',
                  });
                }
              }
            });
          }
        
    });
    validation.fails(() => {
      res.status(400).json(validation.errors);
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message,
    });
   }
  }
 

}

export default  UserController;