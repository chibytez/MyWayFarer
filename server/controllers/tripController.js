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
    let allTrips;
    let allTripQuery;
    let statustype 

    if (req.query.status === undefined) {
        
    }

} catch (err) {
    
}
 }

}

export default TripsController;