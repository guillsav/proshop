import { UpdateProductAttrs } from '../lib';
import { Product, ProductAttrs, ProductDoc } from '../model';

const add = async (
  attrs: ProductAttrs,
  userId: string
): Promise<ProductDoc> => {
  const { name, image, brand, category, description, price, countInStock } =
    attrs;

  const product = await Product.build({
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
    userId
  }).save();

  return product;
};

const fetch = async (): Promise<ProductDoc[]> => {
  const products = await Product.find({}).populate('reviews');
  return products;
};

const find = async (id: string): Promise<ProductDoc | null> => {
  const product = await Product.findById(id);
  return product || null;
};

const update = async (
  updateAttrs: UpdateProductAttrs,
  product: ProductDoc
): Promise<ProductDoc> => {
  await product.set({ ...updateAttrs }).save();
  return product;
};

const remove = async (product: ProductDoc) => {
  await product.delete();
  return true;
};

export default { add, fetch, find, update, remove };
