const request = require('supertest');
const { app, closeDatabase } = require('../../app');

afterAll(async () => {
    await closeDatabase();
  });
  

describe('User Controller Tests', () => {
  
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john.doee@example.com',
          age: 25,
        });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
    });


    it('should find user by id', async () => {
        const newUser = await request(app)
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john.eee@example.com',
          age: 25,
        });
      const response = await request(app)
        .get(`/users/${newUser.body._id}`)
        .send({
          name: 'John Doe',
          email: 'john.doee@example.com',
          age: 25,
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });
})
  