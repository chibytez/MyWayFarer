
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

   /**
 *
 *@method adminGetAllBooking
 * @description  get  all booking
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof AdminController
 */
 static async adminGetAllBooking (req,res) {
try {
      const   allBookingQuery =   `SELECT booking.id, booking.user_id, booking.trip_id, trip.bus_id,trip.trip_date, booking.seat_number, 
                    users.first_name, users.last_name, users.email FROM booking  INNER JOIN users  ON booking.user_id
                     = users.id INNER JOIN trip ON booking.trip_id = trip.id`
       const   allBooking = await db.query(allBookingQuery, []);   

          if (allBooking.rows.length > 0) {
            return res.status(200).json({
              status: 'sucess',
              data: allBooking.rows,
            });
          }

          return res.status(404).json({
            status: 404,
            error: `no Booking found`,
          });

} catch (err) {
    return res.status(500).json({
        status: 500,
        error: 'Err Detected',
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