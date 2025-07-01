import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';

import app from '../app';

dotenv.config({ path: '.env.test' });

// Mock AI service (we'll create this file soon)
jest.mock('../services/aiService', () => ({
  generateSummary: jest.fn(() => Promise.resolve('mock summary'))
}));

import { generateSummary } from '../services/aiService';
import Snippet from '../models/Snippet';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, { dbName: 'testdb' });
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
    expect(doc!.summary).toBe('mock summary');
  });
});
