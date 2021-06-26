import { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IAuthored extends Document {
  author: Schema.Types.ObjectId,
  isAuthorized(user: IUser): boolean;
}
