import { Schema, model } from 'mongoose';

const snippetSchema = new Schema({
  text: { type: String, required: true },
  summary: { type: String, required: true }
}, { timestamps: true });

const Snippet = model('Snippet', snippetSchema);

export default Snippet;
