import mongoose, { Document, Model, Schema } from 'mongoose';

export interface InventoryItem extends Document {
    name: string;
    quantity: number;
    usageCount: number;
    createdAt: Date;
    updatedAt: Date;
    strength: string;
    dosageForm: string;
    expiry_date: string;
    prescription: string
}

const inventoryItemSchema = new Schema<InventoryItem>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    usageCount: { type: Number, default: 0 },
    strength: { type: String },
    dosageForm: { type: String },
    expiry_date: { type: String},
    prescription: {type: String}
}, { timestamps: true });

const InventoryItemModel: Model<InventoryItem> = mongoose.model('InventoryItem', inventoryItemSchema);

export default InventoryItemModel;