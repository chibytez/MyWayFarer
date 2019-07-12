import db from '../model/database';


class TripsController {

    
 /**
  *
  * @method getAllTrips
  * @description it can get all trips
  * @param {object} req - the request body
  * @param {object} res - the response body
  * @memberof TripsController
  */
 static async getAllTrips  (req, res)  {
try {
      const   allTripQuery =   'SELECT * FROM trip';
       const   allTrips = await db.query(allTripQuery, []);   

          if (allTrips.rows.length > 0) {
            return res.status(200).json({
              status: 'success',
              data: allTrips.rows,
            });
          }

          return res.status(404).json({
            status: 404,
            error: `no trip found`,
          });

} catch (err) {
    return res.status(500).json({
        status: 500,
        error: 'Err Detected',
      });
}
 }




 
}

export default TripsController;