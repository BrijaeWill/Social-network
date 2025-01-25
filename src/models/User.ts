// Define Mongoose
import { Schema, model, Document } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Array<string>; 
  friends: Array<string>; 
  friendCount?: number; 
}

// Create the User schema
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

// Create a virtual for friendCount
userSchema.virtual('friendCount').get(function(this: IUser) {
  return this.friends.length;
});

// Create the User model
const User = model<IUser>('User', userSchema);

export default User;