jest.mock('../services/aiService', () => ({
  generateSummary: jest.fn(() => Promise.resolve('mock summary'))
}));

import mongoose from 'mongoose';
import request from 'supertest';

import app from '../app';
import { generateSummary } from '../services/aiService';
import Snippet from '../models/Snippet';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-snippet-test';

beforeAll(async () => {
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  jest.clearAllMocks();
  await Snippet.deleteMany();
});

describe('POST /snippets', () => {
  it('should create snippet and return summary', async () => {
    const text = 'This is a raw text that needs summarization.';

    const res = await request(app).post('/snippets').send({ text });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.text).toBe(text);
    expect(res.body.summary).toBe('mock summary');
    expect(generateSummary).toHaveBeenCalledWith(text);
    
    const doc = await Snippet.findById(res.body.id);
    expect(doc).not.toBeNull();
    expect(doc?.summary).toBe('mock summary');
  });
});

describe('GET /snippets/:id', () => {
  it('should return snippet by id', async () => {
    const created = await Snippet.create({ text: 'test', summary: 'sum' });

    const res = await request(app).get(`/snippets/${created._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(String(created._id));
    expect(res.body.text).toBe('test');
    expect(res.body.summary).toBe('sum');
  });

  it('should return 404 if snippet not found', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/snippets/${id}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /snippets', () => {
  it('should return list of snippets', async () => {
    await Snippet.create({ text: 'one', summary: 's1' });
    await Snippet.create({ text: 'two', summary: 's2' });

    const res = await request(app).get('/snippets');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('text');
    expect(res.body[0]).toHaveProperty('summary');
  });
});

describe('GET /snippets/:id error cases', () => {
  it('should return 400 for invalid ID format', async () => {
    const res = await request(app).get('/snippets/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /snippets error cases', () => {
  it('should handle AI service failure gracefully', async () => {
    const mockedGenerateSummary = generateSummary as jest.Mock;
    mockedGenerateSummary.mockRejectedValueOnce(new Error('AI fail'));

    const res = await request(app).post('/snippets').send({ text: 'fail me' });
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});
