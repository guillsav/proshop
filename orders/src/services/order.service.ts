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
  const order = await Order.findById(id);
  return order || null;
};

const remove = async (order: OrderDoc) => {
  await order.delete();
  return true;
};

export default { add, fetch, find, remove };
