import mongoose, { Document, Schema } from 'mongoose';

interface ICondition {
    status: 'yes' | 'no' | '';
    notes: string;
}

export interface IPreviousConsultation extends Document {
    date: Date;
    firstName: string;
    previous_consultation_id: string;
    lastName: string;
    gender: 'female' | 'male' | 'other' | '';
    phoneNumber: string;
    age: number;
    conditions: {
        highBloodPressure: ICondition;
        heartDisease: ICondition;
        highCholesterol: ICondition;
        diabetes: ICondition;
        bleedingDisorder: ICondition;
        allergies: ICondition;
    };
    temperature: string;
    glucose: string;
    blood_pressure: string;
    oxygen_saturation: string;
    pulse: string;
    consultation: string;
    seen_by: string;
    prescription: string;
    sugery: 'yes' | 'no' | '';
    isMarked: boolean;
}

const ConditionSchema = new Schema({
    status: { type: String, enum: ['yes', 'no', ''], default: '' },
    notes: { type: String, default: '' }
});

const PreviousConsultationSchema: Schema = new Schema({
    previous_consultation_id: { type: String, required: true },
    date: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['female', 'male', 'other', ''], required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true },
    conditions: {
        highBloodPressure: ConditionSchema,
        heartDisease: ConditionSchema,
        highCholesterol: ConditionSchema,
        diabetes: ConditionSchema,
        bleedingDisorder: ConditionSchema,
        allergies: ConditionSchema
    },
    temperature: { type: String, required: true },
    glucose: { type: String, required: true },
    blood_pressure: { type: String, required: true },
    oxygen_saturation: { type: String, required: true },
    pulse: { type: String, required: true },
    consultation: { type: String, required: true },
    seen_by: { type: String, required: true },
    prescription: { type: String, required: true },
    sugery: { type: String, enum: ['yes', 'no', ''] },
    isMarked: { type: Boolean, default: false }
});

export default mongoose.model<IPreviousConsultation>('Previous_Consultation', PreviousConsultationSchema);

