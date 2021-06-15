import { UpdateOrderAttrs } from '../lib';
import { Order, OrderAttrs, OrderDoc } from '../model';

const add = async (attrs: OrderAttrs, userId: string): Promise<OrderDoc> => {
  attrs.userId = userId;
  const order = await Order.build({ ...attrs }).save();

  return order;
};

const fetch = async (userId: string): Promise<OrderDoc[]> => {
  const orders = await Order.find({ userId }).populate('products');
  return orders;
};

const find = async (id: string): Promise<OrderDoc | null> => {
  const order = await Order.findById(id).populate('products');
  return order || null;
};

const update = async (
  order: OrderDoc,
  updateAttrs: UpdateOrderAttrs
): Promise<OrderDoc> => {
  await order.set({ ...updateAttrs }).save();
  return order;
};

const remove = async (order: OrderDoc): Promise<boolean> => {
  await order.delete();
  return true;
};

export default { add, fetch, find, remove, update };
