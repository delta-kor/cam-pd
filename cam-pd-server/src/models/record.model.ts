import { Document, model, Schema, SchemaTypes } from 'mongoose';
import Utils from '../utils';

export interface Record extends Document {
  uuid: string;
  userUuid: string;
  stageUuid: string;
  score: number;
  data: any;
}

const RecordSchema = new Schema<Record>({
  uuid: { type: String, required: true, unique: true, default: () => Utils.generateUuid(12) },
  userUuid: { type: String, required: true },
  stageUuid: { type: String, required: true },
  score: { type: Number, required: true },
  data: { type: SchemaTypes.Mixed, required: true },
});

const RecordModel = model<Record>('Record', RecordSchema);

export default RecordModel;
