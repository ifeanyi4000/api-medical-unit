import { NextFunction, Request, Response } from 'express';
import HealthRecord, { IHealthRecord } from '../models/healthRecords';
import ErrorHandler from '../utils/ErrorHandler';

// Custom interface for extended Response
interface HealthRecordResponse extends Response {
  healthRecord?: IHealthRecord;
}

// Middleware function to get health record by ID
export async function getHealthRecord(req: Request, res: HealthRecordResponse, next: NextFunction) {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);
    if (!healthRecord) {
      return next(new ErrorHandler('Cannot find health record', 404));
    }
    res.healthRecord = healthRecord;
    next();
  } catch (err) {
    return next(new ErrorHandler('Error finding health record', 500));
  }
}

// Get all health records
export const getAllRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const healthRecords = await HealthRecord.find();
    res.json(healthRecords);
  } catch (err) {
    next(new ErrorHandler('Error fetching health records', 500));
  }
};

// Get one health record
export const getRecordById = (req: Request, res: HealthRecordResponse) => {
  res.json(res.healthRecord);
};

// Create one health record
export const createRecord = async (req: Request, res: Response, next: NextFunction) => {
  const healthRecord = new HealthRecord({
    name: req.body.name,
    age: req.body.age,
    lastCheckup: req.body.lastCheckup,
    condition: req.body.condition,
    additionalNotes: req.body.additionalNotes
  });

  try {
    const newHealthRecord = await healthRecord.save();
    res.status(201).json(newHealthRecord);
  } catch (err) {
    next(new ErrorHandler('Error creating health record', 400));
  }
};

// Update one health record
export const updateRecord = async (req: Request, res: HealthRecordResponse, next: NextFunction) => {
  if (!res.healthRecord) {
    return next(new ErrorHandler('Health record not found', 404));
  }

  const { name, age, lastCheckup, condition, additionalNotes } = req.body;

  if (name) res.healthRecord.name = name;
  if (age) res.healthRecord.age = age;
  if (lastCheckup) res.healthRecord.lastCheckup = lastCheckup;
  if (condition) res.healthRecord.condition = condition;
  if (additionalNotes) res.healthRecord.additionalNotes = additionalNotes;

  try {
    const updatedHealthRecord = await res.healthRecord.save();
    res.json(updatedHealthRecord);
  } catch (err) {
    next(new ErrorHandler('Error updating health record', 400));
  }
};

// Delete one health record
export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const healthRecord = await HealthRecord.findById(id);

    if (!healthRecord) {
      return next(new ErrorHandler('Record not found', 404));
    }

    await healthRecord.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Deleted Health Record',
    });
  } catch (error: any) {
    next(new ErrorHandler(error.message, 400));
  }
};

