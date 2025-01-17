import { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import returningConsultationModel, { IPreviousConsultation } from '../models/returning.consultation.model';



// Get all consultations

export const getPConsultation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consultations = await previous.find({}, 'previous_consultation_id'); // Only retrieve the IDs
        const consultationIds = consultations.map(consultation => consultation.previous_consultation_id);
        res.json(consultationIds);
    } catch (error) {
        console.error("Error fetching consultation IDs:", error);
        res.status(500).json({ error: 'Failed to fetch consultation IDs' });
    }
};



export const getPConsultationByIdNew = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consultations = await returningConsultationModel.find({ previous_consultation_id: req.params.id });
        if (consultations.length === 0) {
          return res.status(404).json({ message: 'No consultations found with the given ID' });
        }
        res.json(consultations);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching consultations', error: error.message });
      }
};


export const getPConsultationByIdDetails = async (req: Request, res: Response, next: NextFunction) => {
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
        const processedConditions: any = {
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
