import { Order, OrderAttrs, OrderDoc } from '../model';

const add = async (attrs: OrderAttrs, userId: string): Promise<OrderDoc> => {
  attrs.userId = userId;
  const order = await Order.build({ ...attrs }).save();

  return order;
};

export default { add };
