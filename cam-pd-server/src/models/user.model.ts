import jwt from 'jsonwebtoken';
import { Document, model, Schema } from 'mongoose';
import Utils from '../utils';

export interface User extends Document {
  uuid: string;
  nickname: string;
  ip: string[];
  generateToken(): Promise<string>;
}

const UserSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    default: () => Utils.generateUuid(8),
  },
  nickname: { type: String, required: true, unique: true },
  ip: { type: Array, required: true, default: [] },
});

UserSchema.methods.generateToken = async function (this: User) {
  const payload: JwtPayload = { uuid: this.uuid };
  return jwt.sign(payload, process.env.SECRET!);
};

const UserModel = model<User>('User', UserSchema);

export default UserModel;
