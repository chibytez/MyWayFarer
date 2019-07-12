import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';
import app from '../../app';
chai.use(chaiHttp);

describe('USER SIGNUP API ENDPOINT', () => {
describe('User sign up', () => {
    it('should create a new user', (done) => {
         const user = {
        first_name: 'Chibuike',
        last_name: 'Aniaku',
        email: 'chibuikeaniaku@gmail.com',
        password: 'Chibyke8%',
        admin: true,    
      };
          chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('token');
          done();
        });
    });
     it('should not create a new user when the firstname is not provided', (done) => {
    const user = {
      last_name: 'chibyke',
      email: 'becky@gmail.com',
      password: '123def',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        expect(res.status).to.equal(400)
        done();
      });
  });

  it('should not create a new user when the lastname is not provided', (done) => {
    const user = {
      first_name: 'chibuike',
      email: 'aniaku@gmail.com',
      password: 'chibyke',
    };
    chai.request(app)
    .post('/api/v1/auth/signup')
    .send(user)
    .end((error, res) => {
        expect(res.status).to.equal(400);
      });
      done();
  });
});

describe('User login', () => {
  
  it('should login a user account on /signin/ POST ', (done) => {
    const user = {
      email: 'chibuikeaniaku@gmail.com',
      password: 'Chibyke8%',
    }; 
     chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('token');
        done();
      });
});

it('should not login user if the password is not provided', (done) => {
  const user = {
    email: 'chibyke@gmail.com',
  };
  chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
});
});

});

     
