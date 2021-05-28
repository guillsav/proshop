import mongoose from 'mongoose';
import { Password } from '../helpers';

export interface UserAttrs {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    },
    timestamps: true
  }
);

/* Hash user password before saving new user to DB */
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('users', userSchema);

export default User;
