// import mongoose, { Document, Schema } from 'mongoose';

// interface ICondition {
//   status: 'yes' | 'no' | '';
//   notes: string;
// }

// export interface IConsultation extends Document {
//   date: Date;
//   firstName: string;
//   lastName: string;
//   gender: 'female' | 'male' | 'other' | '';
//   phoneNumber: string;
//   age: number;
//   conditions: {
//     highBloodPressure: ICondition;
//     heartDisease: ICondition;
//     highCholesterol: ICondition;
//     diabetes: ICondition;
//     bleedingDisorder: ICondition;
//     allergies: ICondition;
//   };
//   temperature: string;
//   glucose: string;
//   blood_pressure: string;
//   oxygen_saturation: string;
//   pulse: string;
//   consultation: string;
//   seen_by: string;
//   prescription: string;
//   sugery: 'yes' | 'no' | '';
//   isMarked: boolean;
// }

// const ConsultationSchema: Schema = new Schema({
//   date: { type: Date, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   temperature: { type: String, required: true },
//   glucose: { type: String, required: true },
//   blood_pressure: { type: String, required: true },
//   oxygen_saturation: { type: String, required: true },
//   pulse: { type: String, required: true },
//   consultation: { type: String, required: true },
//   seen_by: { type: String, required: true },
//   prescription: { type: String, required: true },
//   sugery: { type: String, enum: ['yes', 'no', '']},
//   gender: { type: String, enum: ['female', 'male', 'other', ''], required: true },
//   phoneNumber: { type: String, required: true },
//   age: { type: Number, required: true },
//   conditions: {
//     highBloodPressure: {
//       status: { type: String, enum: ['yes', 'no', ''], default: '' },
//       notes: { type: String, default: '' }
//     },
//     heartDisease: {
//       status: { type: String, enum: ['yes', 'no', ''], default: '' },
//       notes: { type: String, default: '' }
//     },
//     highCholesterol: {
//       status: { type: String, enum: ['yes', 'no', ''], default: '' },
//       notes: { type: String, default: '' }
//     },
//     diabetes: {
//       status: { type: String, enum: ['yes', 'no', ''], default: '' },
//       notes: { type: String, default: '' }
//     },
//     bleedingDisorder: {
//       status: { type: String, enum: ['yes', 'no', ''], default: '' },
//       notes: { type: String, default: '' }
//     },
//     allergies: {
//       status: { type: String, enum: ['yes', 'no', ''], default: '' },
//       notes: { type: String, default: '' }
//     }
//   },
//   isMarked: { type: Boolean, default: false }
// });

// export default mongoose.model<IConsultation>('Consultation', ConsultationSchema);




import mongoose, { Document, Schema } from 'mongoose';

interface ICondition {
  status: 'yes' | 'no' | '';
  notes: string;
}

export interface IConsultation extends Document {
  date: Date;
  firstName: string;
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

const ConsultationSchema: Schema = new Schema({
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
  sugery: { type: String, enum: ['yes', 'no', '']},
  isMarked: { type: Boolean, default: false }
});

export default mongoose.model<IConsultation>('Consultation', ConsultationSchema);

