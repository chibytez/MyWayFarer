import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import bcrypt from 'bcryptjs';
import app from '../../app';
import db from '../model/database';
chai.use(chaiHttp);

let token;
let id = 1;

async function createAdmin() {
  const query = `INSERT INTO users(first_name, last_name, email, password, is_admin)
  VALUES($1, $2, $3, $4, $5) RETURNING email, first_name, last_name, id`;
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash('Chibyke8%', salt);
const values = ['Aniaku', 'Chibuike', 'aniakunnakeziee@gmail.com', hash, true];
return db.query(query, values);
  }

    describe('tests for Bookings controller', () => {
   before(async () => {
      await createAdmin();
    });

 it('should get login and return a token', (done) => {
        const user = {
            email: 'aniakunnakeziee@gmail.com',
            password: 'Chibyke8%',
        };
        chai.request(app)
        .post('/api/v1/auth/signin')
          .send(user)
          .end((err, res) => {
                 
            token = res.body.token;
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('token')
            done();
          });
      });

it('should create a new account', (done) => {
       const trips = {
        bus_id: 1,
        origin: 'lagos',
        destination: 'enugu',
        fare: 5000,
      };
      chai.request(app)
        .post('/api/v1/trips')
        .set('token', token)
        .send(trips)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('trip');
          done();
            });
        });
 describe('/POST book a trip', () => {
      it('should create a booking', (done) => {
   const booking = {
                trip_id: 1,
                seat_number:1,
              };
              chai.request(app)
              .post(`/api/v1/bookings`)
                .set('token', token)
                .send(booking)
                .end((err, res) => {
                 expect(res.body).to.have.property('success');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('trip');
                  done();
                });
      });
        it('should fail to make a booking if the route is incorrect', (done) => {
                const booking = {
                  trip_id: 1,
                seat_number:1,
                };
                chai.request(app)
                .post(`/api/v1/tripss`)
                  .set('token', token)
                  .send(booking)
                  .end((err, res) => {
                    expect(res.status).to.equal(404);
                    done();
                  });
              });  
 });

 describe('/GET  a all bookings', () => {
 it('should get all users bookings', (done) => {
 chai.request(app)
      .get(`/api/v1/bookings`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
 });
 });

  describe('/DELETE  delete a booking by id', () => {
 it('should delete a specific booking', (done) => {
 chai.request(app)
        .delete(`/api/v1/bookings/${id}`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          done();
        });
 });

  it('should fail to delete if the booking_id is incorrect', (done) => {
      chai.request(app)
        .delete(`/api/v1/bookings/${id}1`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
    })