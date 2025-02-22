import express from 'express';
import { saveToken, sendNotification } from '../controlers/sendNotification.controller';

const pushRouter = express.Router();

pushRouter.post('/send-notification', sendNotification);
pushRouter.post('/save-token', saveToken);

export default pushRouter;
