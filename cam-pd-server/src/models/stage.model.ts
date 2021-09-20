import { Document, model, Schema } from 'mongoose';
import Utils from '../utils';

export interface Stage extends Document {
  uuid: string;
  title: string;
  concert: string;
  videoId: string;
  scoresheet: string;
  length: number;
}

const StageSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    default: () => Utils.generateUuid(8),
  },
  title: { type: String, required: true },
  concert: { type: String, required: true },
  videoId: { type: String, required: true },
  scoresheet: { type: String, required: true, default: '0.11111' },
  length: { type: Number, required: true },
});

const StageModel = model<Stage>('Stage', StageSchema);

export default StageModel;
