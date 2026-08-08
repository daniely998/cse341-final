const request = require('supertest');
const express = require('express');
const router = require('../routes/index');
const mongodb = require('../data/database');

const app = new express();
app.use('/', router);

describe('Get routes test', () => {
  beforeAll((done) => {
    mongodb.initDb((err) => {
      if (err) return done(err);
      done();
    });
  });

  afterAll(async () => {
    const client = mongodb.getDatabase();
    await client.close();
  });

  test('Users GetAll, length', async() => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(6);
  });

  test('Users GetAll, second element/body[1] birthday', async() => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[1].birthday).toBe('2-6-1997');
  });

  test('Users GetSingle, first name', async() => {
    const res = await request(app).get('/users/6a510713b3d9ce6a50e7976d');
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('Joshua');
  });

  test('Users GetSingle, email', async() => {
    const res = await request(app).get('/users/6a5875a719dd42f4c66a4bd3');
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('emilyp243@gmail.com');
  });

  test('Songs GetAll, length', async() => {
    const res = await request(app).get('/songs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(5);
  });

  test('Songs GetAll, body[4]', async() => {
    const res = await request(app).get('/songs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[4].artist).toBe('Courtnee Draper');
  });

  test('Songs GetSingle, songTitle', async() => {
    const res = await request(app).get('/songs/6a59dcad590dc45353aaf0fd');
    expect(res.statusCode).toBe(200);
    expect(res.body.songTitle).toBe('One');
  });

  test('Songs GetSingle, language', async() => {
    const res = await request(app).get('/songs/6a59df56590dc45353aaf102');
    expect(res.statusCode).toBe(200);
    expect(res.body.language).toBe('Mandarin');
  });

  test('Artists GetAll, length', async() => {
    const res = await request(app).get('/artists');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(5);
  });

  test('Artists GetAll, artistName', async() => {
    const res = await request(app).get('/artists');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].artistName).toBe('Linkin Park');
  });

  test('Artists GetSingle, artistName', async() => {
    const res = await request(app).get('/artists/6a75917311ae00669f372ada');
    expect(res.statusCode).toBe(200);
    expect(res.body.artistName).toBe('Aimer');
  });

  test('Artists GetSingle, language', async() => {
    const res = await request(app).get('/artists/6a75915a11ae00669f372ad9');
    expect(res.statusCode).toBe(200);
    expect(res.body.language).toBe('Japanese');
  });

  test('Favorites GetAll, length', async() => {
    const res = await request(app).get('/favorites');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
  });

  test('Favorites GetAll, songTitle', async() => {
    const res = await request(app).get('/favorites');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[2].songTitle).toBe('No Scared');
  });

  test('Favorites GetSingle, songTitle', async() => {
    const res = await request(app).get('/favorites/6a76a69a8675de863af13846');
    expect(res.statusCode).toBe(200);
    expect(res.body.songTitle).toBe('Ode to Grand Theft');
  });

  test('Favorites GetSingle, artist', async() => {
    const res = await request(app).get('/favorites/6a76a6af8675de863af1384b');
    expect(res.statusCode).toBe(200);
    expect(res.body.artist).toBe('ONE OK ROCK');
  });
});