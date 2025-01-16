import { NextFunction, Request, Response } from 'express';
import consultationModel, { IConsultation } from '../models/consultation.model';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';



// Get all consultations

export const getConsultation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consultations = await consultationModel.find().sort({ createdAt: -1 });
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getConsultationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const consultation = await consultationModel.findById(id)

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        res.status(200).json({
            success: true,
            consultation,
        });
    } catch (error) {
        next(error);
    }
};

export const createConsultation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consultationData: IConsultation = req.body;

        // Process conditions data
        const processedConditions:any = {
            highBloodPressure: processCondition(consultationData.conditions['High blood pressure']),
            heartDisease: processCondition(consultationData.conditions['Heart disease']),
            highCholesterol: processCondition(consultationData.conditions['High Cholesterol']),
            diabetes: processCondition(consultationData.conditions['Diabetes']),
            bleedingDisorder: processCondition(consultationData.conditions['Bleeding disorder']),
            allergies: processCondition(consultationData.conditions['Allergies'])
        };

        // Create a new consultation with processed data
        const consultation = new consultationModel({
            ...consultationData,
            conditions: processedConditions
        });

        const newConsultation = await consultation.save();
        res.status(201).json(newConsultation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Helper function to process condition data
function processCondition(condition: any): { status: string; notes: string } {
    return {
        status: condition?.status || '',
        notes: condition?.notes || ''
    };
}


// Update one consultation
export const updateMarkedConsultation = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, isMarked } = req.body;
        const consultation = await consultationModel.findByIdAndUpdate(id, { isMarked }, { new: true });
        res.status(200).json({
            success: true,
            consultation
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})

// Delete one consultation
export const deleteConsultation = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const consultation = await consultationModel.findById(id)

        if (!consultation) {
            return next(new ErrorHandler("User not found", 404))
        }
        await consultation.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "Consultation deleted successful",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
