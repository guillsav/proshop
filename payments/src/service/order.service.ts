import { UpdateOrderAttrs } from '../lib';
import { Order, OrderAttrs, OrderDoc } from '../model';

const add = async (attrs: OrderAttrs): Promise<OrderDoc> => {
  const order = await Order.build({ ...attrs }).save();
  return order;
};

const findById = async (id: string): Promise<OrderDoc | null> => {
  const order = await Order.findById(id);
  return order || null;
};

const update = async (
  order: OrderDoc,
  update: UpdateOrderAttrs
): Promise<OrderDoc> => {
  await order.set({ ...update }).save();
  return order;
};

const remove = async (order: OrderDoc): Promise<boolean> => {
  await order.delete();
  return true;
};

export default { add, findById, remove, update };
