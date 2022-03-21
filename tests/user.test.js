const request = require('supertest');
const { set } = require('../app');
const app = require('../app');
const db = require('../config/db')
const User = require('../models/User.js');

let userId 
let token

// Add new user test
test('Should create a new user', async () => {
 const data =  await request(app)
    .post('/api/users')
    .send({
      email: 'test@user.com',
      password: 'testuserpass',
    }) 
    .expect(201);
    userId = data._body.id
});


// Login User
test('Should login a user', async () => {
  const data =  await request(app)
     .post('/api/login')
     .send({
       email: 'test@user.com',
       password: 'testuserpass',
     }) 
     .expect(200);
     console.log(data._body)
     token = data._body.token
 });


//Get all users test
test('Should get all users', async () => {
  await request(app).get('/api/users').send().expect(200);
});

// Get single user test
test('Should get single user', async () => {
  await request(app).get(`/api/users/${userId}`).expect(200);
});

// Edit user test
test('Should edit a user', async () => {
  await request(app)
    .patch(`/api/users/${userId}`)
    .set("x-auth-token",token)
    .send({
      password:"testUpdatePassword",
      email:"test@update.com"
    })
    .expect(200);
});

// Delete user test
test('Should delete a user ', async () => {
  await request(app)
    .delete(`/api/users/${userId}`)
    .expect(200);
});