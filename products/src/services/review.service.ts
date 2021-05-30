import { Review, ReviewAttrs, ReviewDoc } from '../model';

const add = async (attrs: ReviewAttrs): Promise<ReviewDoc> => {
  const review = await Review.build(attrs).save();

  return review;
};

const fetch = async (): Promise<ReviewDoc[]> => {
  return await Review.find({});
};

const find = async (id: string): Promise<ReviewDoc | null> => {
  const review = await Review.findById(id);
  return review || null;
};

const remove = async (review: ReviewDoc) => {
  await review.delete();
  return true;
};

export default { add, fetch, find, remove };
