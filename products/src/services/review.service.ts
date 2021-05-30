import { Review, ReviewAttrs, ReviewDoc } from '../model';

const add = async (attrs: ReviewAttrs): Promise<ReviewDoc> => {
  const review = await Review.build(attrs).save();

  return review;
};

const fetch = async (): Promise<ReviewDoc[]> => {
  return await Review.find({});
};

export default { add, fetch };
