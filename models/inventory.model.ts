import mongoose, { Document, Model, Schema } from 'mongoose';

export interface InventoryItem extends Document {
    name: string;
    quantity: number;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const inventoryItemSchema = new Schema<InventoryItem>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    usageCount: { type: Number, default: 0 },
}, { timestamps: true });

const InventoryItemModel: Model<InventoryItem> = mongoose.model('InventoryItem', inventoryItemSchema);

export default InventoryItemModel;