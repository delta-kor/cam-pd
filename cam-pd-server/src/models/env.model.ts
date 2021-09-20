import { Document, model, Schema } from 'mongoose';

export interface Env extends Document {
  key: string;
  value: string;
}

const EnvSchema = new Schema<Env>({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

const EnvModel = model<Env>('Env', EnvSchema);

export default EnvModel;
