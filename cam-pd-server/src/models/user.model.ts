import { model, Schema } from 'mongoose';
import Utils from 'utils';

export interface User {
  uuid: string;
  nickname: string;
  ip: string[];
}

const UserSchmea = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    default: () => Utils.generateUuid(8),
  },
  nickname: { type: String, required: true },
  ip: { type: Array, required: true, default: [] },
});

const UserModel = model('User', UserSchmea);

export default UserModel;
