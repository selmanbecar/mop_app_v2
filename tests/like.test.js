const request = require('supertest');
const { set } = require('../app');
const app = require('../app');
const db = require('../config/db')



//Get top question
test('Should top question', async () => {
    await request(app).get('/api/likes/question/').send().expect(200);
  });  

//Get number of like for question
test('Should get number of like for question', async () => {
  await request(app).get('/api/likes/question/1').send().expect(200);
});

// Get number of like for comment
test('Should number of like for comment', async () => {
  await request(app).get(`/api/likes/comment/1`).expect(200);
});

//Get number of dislike for question
test('Should get number of dislike for question', async () => {
    await request(app).get('/api/likes/question/dislike/1').send().expect(200);
  });
  
// Get number of dislike for comment
  test('Should get number of dislike for comment', async () => {
    await request(app).get(`/api/likes/comment/dislike/1`).expect(200);
  });
  

