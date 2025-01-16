import express from 'express';
import { createConsultation, deleteConsultation, getConsultation, getConsultationById, updateMarkedConsultation } from '../controlers/consultations.controller';

const consultRouter = express.Router();

consultRouter.post('/create-consultaion', createConsultation, );
consultRouter.get('/get-all-consultaion', getConsultation, );
consultRouter.get('/get-consultaion/:id', getConsultationById, );
consultRouter.post('/marked-consultaion/:id', updateMarkedConsultation, );
consultRouter.delete('/delete-consultaion/:id', deleteConsultation, );

export default consultRouter;