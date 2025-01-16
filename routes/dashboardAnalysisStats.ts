import express from 'express';
import { getDashboardStats, getInventoryOverview, getLowStockItems, getPatientDistribution } from '../controlers/dashboardAnalysisController';

const dRouter = express.Router();

dRouter.get('/stats', getDashboardStats);
dRouter.get('/inventory-overview', getInventoryOverview);
dRouter.get('/patient-distribution', getPatientDistribution);
dRouter.get('/low-stock-items', getLowStockItems);

export default dRouter;

