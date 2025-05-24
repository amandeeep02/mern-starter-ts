import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}
