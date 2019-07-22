import db from '../model/database';
import Validator from 'validatorjs';
import { booking_validation } from '../helper/validation/bookingValidation';


class BookingsController{

  /**
 *
 *@method userBookTrip
 * @description  book a trip
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof BookingsController
 */    
static async userBookTrip(req, res) {
    
    try {
        const { user_id } = req.userInfo;   
        const {  trip_id, seat_number } = req.body;
           const validation = new Validator({
            trip_id, seat_number}, booking_validation);
            validation.passes( async() => { 
              const sq = {
        text: 'SELECT * FROM booking WHERE seat_number= $1',
        values: [seat_number],
      };
      const results = await db.query(sq, [seat_number]);
        if (results.rows.length > 0) {
          return res.status(409).json({
            errors: {
              message: ['seat number already taken'],
            },
          });
        }
                const query = { 
                    text: 'INSERT INTO booking(  user_id, trip_id, seat_number) VALUES( $1, $2,$3) RETURNING *',
                    values: [user_id, trip_id, seat_number],
                  };
                  const result = await db.query(query);
                  if (result.rows[0] === 0) {
                    return res.status(404).json({
                      message: " "
                    })
                  }
                  const sql = {
                    text: `SELECT booking.id, booking.user_id, booking.trip_id, trip.bus_id,trip.trip_date, booking.seat_number, 
                    users.first_name, users.last_name, users.email FROM booking  INNER JOIN users  ON booking.user_id
                     = users.id INNER JOIN trip ON booking.trip_id = trip.id  where users.id =$1`,
                    values: [user_id],
                  }
                  const tripSelect = await db.query(sql);
                  return  res.status(201).json({
      success: true,
      message: 'trip Successfully booked',
      trip: tripSelect.rows[0],  
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
 *@method userGetAllBooking
 * @description  user get all his/her booking
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof BookingsController
 */    
static async userGetAllBooking(req, res) {

    try {
 const { user_id, is_admin } = req.userInfo;

if (is_admin) {
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
}
       const sql = {
                    text: `SELECT booking.id, booking.user_id, booking.trip_id, trip.bus_id,trip.trip_date, booking.seat_number, 
                    users.first_name, users.last_name, users.email FROM booking  INNER JOIN users  ON booking.user_id
                     = users.id INNER JOIN trip ON booking.trip_id = trip.id  where users.id =$1`,
                    values: [user_id],
                  }
      const bookings = await db.query(sql, [user_id]);
      
      if (bookings.rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: bookings.rows,
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'booking not found',
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: 'err detected',
      });
    }
}


 /**
 *
 *@method userDeleteBooking
 * @description  user can delete  his/her booking
 * @param {object} req -the request body
 * @param {object} res - the object body
 * @memberof BookingsController
 */    
static async userDeleteBooking(req, res) {
   const deleteQuery = 'DELETE FROM booking WHERE id =$1  returning *';
try {
   const { rows } = await db.query(deleteQuery, [req.params.id]);
    if(!rows[0]) {
      return res.status(404).send({'message': 'booking not found'});
    }
    return res.status(200).json({
      status: 200,
      message: 'booking successfully deleted',
    });
} catch (err) {
   return res.status(500).json({
              status: 500,
              err: 'Error Detected',
            });
}
}


}

export default BookingsController;