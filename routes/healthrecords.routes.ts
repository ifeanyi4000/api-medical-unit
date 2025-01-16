import express from 'express';
import { createRecord, deleteRecord, getAllRecords, getHealthRecord, getRecordById, updateRecord } from '../controlers/healthRecords.controller';

const recordRouter = express.Router();

recordRouter.get('/get-all-records', getAllRecords);
recordRouter.get('/get-record/:id', getHealthRecord, getRecordById);
recordRouter.post('/create-records', createRecord);
recordRouter.post('/update-record/:id', getHealthRecord, updateRecord);
recordRouter.delete('/delete-record/:id', deleteRecord);

export default recordRouter;