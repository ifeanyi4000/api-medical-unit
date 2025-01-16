import { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import returningConsultationModel, { IPreviousConsultation } from '../models/returning.consultation.model';



// Get all consultations

export const getPConsultation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { previous_consultation_id } = req.params;
    
        const consultations = await returningConsultationModel.find({ previous_consultation_id }).sort({ date: -1 });
    
        res.json(consultations);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
      }
};

export const getPConsultationById = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { id } = req.params;

        const consultation = await returningConsultationModel.findById(id)

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

export const createPConsultation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consultationData: IPreviousConsultation = req.body;

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
        const consultation = new returningConsultationModel({
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
        const consultation = await returningConsultationModel.findByIdAndUpdate(id, { isMarked }, { new: true });
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
        const consultation = await returningConsultationModel.findById(id)

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
