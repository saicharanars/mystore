import { z } from 'zod';
import { createLocationDto } from './location';

const createshipment = z.object({
  orderId: z.string().uuid(),
  trackingId: z.number(),
  delivery_status: z.enum([
    'created',
    'shipped',
    'on_the_way',
    'delivered',
    'returned',
    'replaced',
  ]),
  address: createLocationDto,
});
const shipmentschema = createshipment.extend({
  _id: z.string().uuid(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  userId: z.string().uuid(),
});

const shipmentsResponse = z.object({
  items: z.array(shipmentschema),
  count: z.number(),
});
const editshipment = createshipment.partial();

type createshipmentType = z.infer<typeof createshipment>;
type shipmentType = z.infer<typeof shipmentschema>;
type editshipmentType = z.infer<typeof editshipment>;
type shipmentsResponseType = z.infer<typeof shipmentsResponse>;

export { createshipment, shipmentsResponse, shipmentschema, editshipment };
export type {
  createshipmentType,
  shipmentsResponseType,
  shipmentType,
  editshipmentType,
};
