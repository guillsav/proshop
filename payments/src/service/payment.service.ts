import { Payment, PaymentAttrs, PaymentDoc } from '../model';
import { UpdatePaymentAttrs } from '../lib';

const add = async (attrs: PaymentAttrs): Promise<PaymentDoc> => {
  const payment = await Payment.build({ ...attrs }).save();
  return payment;
};

const fetch = async (userId: string): Promise<PaymentDoc[]> => {
  return await Payment.find({ userId });
};

const find = async (id: string): Promise<PaymentDoc | null> => {
  const payment = await Payment.findById(id);
  return payment || null;
};

const update = async (
  payment: PaymentDoc,
  update: UpdatePaymentAttrs
): Promise<PaymentDoc> => {
  await payment.set({ ...update }).save();
  return payment;
};

const remove = async (payment: PaymentDoc): Promise<boolean> => {
  await payment.delete();
  return true;
};

export default { add, fetch, find, remove, update };
