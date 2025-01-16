import express from 'express';
import { createPConsultation, deleteConsultation, getPConsultation, getPConsultationById, updateMarkedConsultation } from '../controlers/previous.consultation.controller';


const previousConsultRouter = express.Router();

previousConsultRouter.post('/create-previous-consultaion', createPConsultation,);
previousConsultRouter.get('/previous-consultations/:previous_consultation_id', getPConsultation,);
previousConsultRouter.get('/get-previous-consultaion/:id', getPConsultationById,);
previousConsultRouter.post('/marked-previous-consultaion/:id', updateMarkedConsultation,);
previousConsultRouter.delete('/delete-previous-consultaion/:id', deleteConsultation,);

export default previousConsultRouter;