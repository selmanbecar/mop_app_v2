const request = require('supertest');
const { set } = require('../app');
const app = require('../app');
const db = require('../config/db')

let commentId
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

 // Add new comment test
test('Should create a new comment', async () => {
    const data =  await request(app)
       .post('/api/comments')
       .set("x-auth-token",token)
       .send({
         userId: 1,
         questionId: 1,
         comment:"test-comment"
       }) 
       .expect(201);
       commentId = data._body.id
       
   });
   

//Get all comment test
test('Should get all comments', async () => {
  await request(app).get('/api/comments/question/1').send().expect(200);
});

// Get single comment test
test('Should get single comment', async () => {
  await request(app).get(`/api/comments/${commentId}`).expect(200);
});


// Delete question test
test('Should delete a comment ', async () => {
  await request(app)
    .delete(`/api/comments/${commentId}`)
    .set("x-auth-token",token)
    .expect(200);
});