import mongoose from 'mongoose';

export interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

export interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
}

export interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true
    },
    stripeId: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret.id;
      }
    },
    timestamps: true
  }
);

paymentSchema.statics.build = (attrs: PaymentAttrs): PaymentDoc =>
  new Payment(attrs);

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  'payments',
  paymentSchema
);

export default Payment;
