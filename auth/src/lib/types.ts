import { Collection } from 'mongodb';

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Database {
  users: Collection<User>;
}
