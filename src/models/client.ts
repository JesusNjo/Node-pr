import mongoose, { Document, Model, Schema } from 'mongoose';

export enum Role {
    ADMIN = 'Admin',
    USER = 'User',
    INVITED = 'Invited'
}

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

export interface IClient extends Document {
    name: string;
    username: string;
    password: string;
    role: Role;
    gender: Gender;
}

const clientSchema = new Schema<IClient>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    gender: { type: String, enum: Object.values(Gender), required: true }
});

const Client: Model<IClient> = mongoose.model<IClient>('Client', clientSchema);

export default Client;
