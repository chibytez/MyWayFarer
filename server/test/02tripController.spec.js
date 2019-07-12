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
  const query = `INSERT INTO users(first_name, last_name, email, password, admin)
      VALUES($1, $2, $3, $4, $5) RETURNING email, first_name, last_name, id`;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('Chibyke8%', salt);
  const values = ['Aniaku', 'Chibuike', 'aniakuchibuike@gmail.com', hash, true];
  return db.query(query, values);
}

describe('tests for trip controller', () => {
 before(async () => {
    await createAdmin();
    });

it('should get login and return admin token', (done) => {
    const user = {
      email: 'aniakuchibuike@gmail.com',
      password: 'Chibyke8%',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  describe('/POST create a trip', () => {
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

 })

describe('/POST USER GET ALL TRIP', () => {
it('should get all trips', (done) => {
      chai.request(app)
        .get(`/api/v1/trips`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('success');
          expect(res.body).to.have.property('data');
          done();
        });
    });
 it('should fail to fetch if the route is not correct', (done) => {
      chai.request(app)
        .get(`/api/v1/tripss`)
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
});

describe('/PATCH  cancel a trip', () => {
    it('should change account status', (done) => {
      const trip = {
        status: 'cancelled',
      };
      chai.request(app)
        .patch(`/api/v1/trips/${id}`)
        .set('token', token)
        .send(trip)
        .end((err, res) => {

           expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
    });
});
});