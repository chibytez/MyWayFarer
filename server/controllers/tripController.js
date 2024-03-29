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
   let allTripQuery;
     let allTrips;
if((req.query.origin == undefined)&&(req.query.destination == undefined)){
  allTripQuery =   'SELECT * FROM trip';
  allTrips = await db.query(allTripQuery, []); 
}
  else if(req.query.origin !== undefined){
   const { origin } = req.query;
   allTripQuery = `SELECT * FROM trip WHERE origin = $1`;
     allTrips = await db.query(allTripQuery, [origin]);   
  } else{
     const { destination } = req.query;
    allTripQuery = `SELECT * FROM trip WHERE destination = $1`;
     allTrips = await db.query(allTripQuery, [destination]);
  }
 if (allTrips.rows.length > 0) {
            return res.status(200).json({
              status: 'success',
              data: allTrips.rows,
            });
          }
           return res.status(404).json({
            status: 404,
            error: 'trip not found',
            });
} catch (error) {
    return res.status(500).json({
        status: 500,
        error: error.message,
      });
}
 }




 
}

export default TripsController;