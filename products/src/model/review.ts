import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export interface ReviewAttrs {
  name: string;
  rating: number;
  comment: string;
  product: string;
}

export interface ReviewDoc extends mongoose.Document {
  name: string;
  rating: string;
  comment: string;
  product: string;
  version: number;
}

interface ReviewModel extends mongoose.Model<ReviewDoc> {
  build(attrs: ReviewAttrs): ReviewDoc;
}

export const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'products'
    }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    },
    timestamps: true
  }
);

reviewSchema.set('versionKey', 'version');
reviewSchema.plugin(updateIfCurrentPlugin);

reviewSchema.statics.build = (attrs: ReviewAttrs) => new Review(attrs);

const Review = mongoose.model<ReviewDoc, ReviewModel>('reviews', reviewSchema);

export default Review;
