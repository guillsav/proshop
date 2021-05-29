import { Collection, ObjectId } from 'mongodb';

export interface Product {
  _id?: ObjectId;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  userId: string;
  version?: number;
}

export interface UpdateProductAttrs {
  name?: string;
  image?: string;
  description?: string;
  brand?: string;
  category?: string;
  price?: number;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
}

export interface Review {
  _id?: string;
  name: string;
  comment: string;
  version?: number;
}

export interface Database {
  products: Collection<Product>;
  reviews: Collection<Review>;
}

export interface UserDoc {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
