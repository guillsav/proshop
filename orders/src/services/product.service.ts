import { Product, ProductAttrs, ProductDoc } from '../model';

const add = async (attrs: ProductAttrs): Promise<ProductDoc> => {
  const product = await Product.build({ ...attrs }).save();
  return product;
};

const find = async (id: string): Promise<ProductDoc | null> => {
  const product = await Product.findById(id);
  return product || null;
};

export default { add, find };
