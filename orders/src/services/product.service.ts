import { UpdateProductAttrs } from '../lib';
import { Product, ProductAttrs, ProductDoc } from '../model';

const add = async (attrs: ProductAttrs): Promise<ProductDoc> => {
  const product = await Product.build({ ...attrs }).save();
  return product;
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

const remove = async (product: ProductDoc): Promise<boolean> => {
  await product.delete();
  return true;
};

export default { add, find, remove, update };
