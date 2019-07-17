
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
      status: '201',
    data:{
    message: 'trip Successfully created',
    trip_id: result.rows[0].id,
    bus_id : result.rows[0].bus_id,
    origin: result.rows[0].origin,  
    destination:result.rows[0].destination,
    fare:result.rows[0].fare,
}
  })
            });  
          validation.fails(() => {
      res.status(400).json( validation.errors, error.message);
    });
   } catch (error) {
    return res.status(500).json({
     status: 500,
     error: error.message,
    });
     }
 }


   /**
 *
 *@method adminCancelTrip
 * @description  admin cancel trip
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AdminController
 */
  static async adminCancelTrip (req,res) {
try {
   const { id } = req.params;
      const { status } = req.body;
       if(status ==='active' || status === 'cancelled'){
            const findTripQuery = 'SELECT * FROM trip WHERE id = $1'; 
            const foundTrip= await db.query(findTripQuery, [id]);
            if (foundTrip.rows.length === 0) {
                return res.status(404).json({
                  status: 404,
                  error: 'trip  not found',
                });
              }
               const updateStatusQuery = 'UPDATE trip SET status = $1 WHERE id = $2 returning *';
              const updatedStatus= await db.query(updateStatusQuery, [status,id]);
               return res.status(200).json({
                status: 200,
                data: {
              message : 'Trip cancelled successfully' ,
                },
              });
                } return res.status(400).json({
              stats:400,
              error:'status can only be active or cancelled',
            });
} catch (err) {
     return res.status(500).json({
                status: 500,
                err: 'Error detected',
              });
}
 }

}

export default AdminController