
import db from '../model/database';
import Validator from 'validatorjs';
import { trip_validation } from '../helper/validation/tripValidation';

class AdminController {

    /**
 *
 *@method createTrip
 * @description  creates  a trip
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AdminController
 */

 static async createTrip (req,res) {
     try {
        const { 
            origin, destination, fare 
           } = req.body;

           const validation = new Validator({
            origin, destination, fare }, trip_validation);
            validation.passes( async() => { 
                const query = { 
                    text : 'INSERT INTO trip( origin, destination, fare, status)VALUES( $1, $2, $3, $4) RETURNING *',
                    values: [origin, destination, fare, 'active'],
                }
                const result = await db.query(query);

                if (result.rows[0] === 0) {
                    return res.status(404).json({
                      message: "no user found"
                    })
                  }
    return  res.status(201).json({
    success: true,
    message: 'trip Successfully created',
    account: result.rows[0],  

  })
            });  
            validation.fails(() => {
              res.status(400).json(validation.errors);
            });
     } catch (err) {
        return res.status(500).json({
            status: 500,
            err: 'Error Detected',
          });
     }
 }


}

export default AdminController