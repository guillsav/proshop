import { User, UserAttrs, UserDoc } from '../model';

const findUser = async (email: string): Promise<UserDoc | undefined> => {
  const user = await User.findOne({ email });
  return user || undefined;
};

const signup = async (attrs: UserAttrs): Promise<UserDoc> => {
  const { name, email, password, isAdmin } = attrs;
  const user = await User.build({ name, email, password, isAdmin }).save();
  return user;
};

export default { findUser, signup };
