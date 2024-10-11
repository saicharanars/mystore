import { shipmentType } from '@ecommerce/types';
import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'node:crypto';

const ShipmentSchema = new Schema<shipmentType>(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      default: () => randomUUID(),
    },
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    trackingId: { type: Number, required: true },
    delivery_status: {
      type: String,
      required: true,
      enum: [
        'created',
        'shipped',
        'on_the_way',
        'delivered',
        'returned',
        'replaced',
      ],
    },
    address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Shipment = mongoose.model('Shipment', ShipmentSchema);
export default Shipment;
