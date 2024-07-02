import mongoose, { Document, Model, Schema } from 'mongoose';
import { IClient } from './client'; 
import { IProduct } from './product';

export interface IOrder extends Document {
    client: IClient['_id']; 
    products: IProduct['_id'][];
    totalAmount: number;
    description?: string;
}

const orderSchema = new Schema<IOrder>({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    totalAmount: { type: Number, required: true },
    description: { type: String }
});

const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
