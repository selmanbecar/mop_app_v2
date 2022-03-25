const request = require('supertest');
const { set } = require('../app');
const app = require('../app');
const db = require('../config/db')

let questionId 
let token



// Login User
test('Should login a user', async () => {
  const data =  await request(app)
     .post('/api/login')
     .send({
       email: 'selmanbecar@gmail.com',
       password: 'selmanpass',
     }) 
     .expect(200);
     token = data._body.token
 });

 // Add new question test
test('Should create a new question', async () => {
    const data =  await request(app)
       .post('/api/questions')
       .set("x-auth-token",token)
       .send({
         userId: 1,
         title: 'test-title',
         description:"test-description"
       }) 
       .expect(201);
       questionId = data._body.id
   });
   

//Get all users test
test('Should get all question', async () => {
  await request(app).get('/api/questions').send().expect(200);
});

// Get single user test
test('Should get single user', async () => {
  await request(app).get(`/api/questions/${questionId}`).expect(200);
});


// Delete question test
test('Should delete a question ', async () => {
  await request(app)
    .delete(`/api/questions/${questionId}`)
    .set("x-auth-token",token)
    .expect(200);
});