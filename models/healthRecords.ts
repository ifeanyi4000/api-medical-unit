import mongoose, { Document, Schema } from 'mongoose';

export interface IHealthRecord extends Document {
  name: string;
  age: number;
  lastCheckup: Date;
  condition: string;
  additionalNotes: string;
}

const HealthRecordSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  lastCheckup: { type: Date, required: true },
  condition: { type: String, required: true },
  additionalNotes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model<IHealthRecord>('HealthRecord', HealthRecordSchema);

