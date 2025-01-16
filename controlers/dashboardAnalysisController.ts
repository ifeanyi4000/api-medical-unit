import { NextFunction, Request, Response } from "express";
import consultationModel from "../models/consultation.model";
import healthRecords from "../models/healthRecords";
import InventoryItemModel from "../models/inventory.model";


export async function getDashboardStats(req: Request, res: Response, next: NextFunction) {
    try {
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const [
            totalConsultations,
            lastMonthConsultations,
            totalUsers,
            lastMonthUsers,
            totalHealthRecords,
            lastMonthHealthRecords,
            totalInventoryItems,
            lastMonthInventoryItems
        ] = await Promise.all([
            consultationModel.countDocuments(),
            consultationModel.countDocuments({ createdAt: { $gte: lastMonth } }),
            healthRecords.countDocuments(),
            healthRecords.countDocuments({ createdAt: { $gte: lastMonth } }),
            healthRecords.countDocuments(),
            healthRecords.countDocuments({ createdAt: { $gte: lastMonth } }),
            InventoryItemModel.countDocuments(),
            InventoryItemModel.countDocuments({ createdAt: { $gte: lastMonth } })
        ]);

        const calculateChange = (total: any, lastMonth: any) =>
            total ? ((lastMonth / total) * 100 - 100).toFixed(1) : 0;

        res.json({
            totalConsultations,
            totalUsers,
            totalHealthRecords,
            totalInventoryItems,
            consultationChange: calculateChange(totalConsultations, lastMonthConsultations),
            userChange: calculateChange(totalUsers, lastMonthUsers),
            healthRecordChange: calculateChange(totalHealthRecords, lastMonthHealthRecords),
            inventoryItemChange: calculateChange(totalInventoryItems, lastMonthInventoryItems),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
};


export async function getInventoryOverview(req: Request, res: Response, next: NextFunction) {
    try {
        const inventoryItems = await InventoryItemModel.find().sort('-quantity').limit(5);

        const labels = inventoryItems.map(item => item.name);
        const currentStock = inventoryItems.map(item => item.quantity);
        const minimumRequired = inventoryItems.map(item => Math.max(item.quantity / 2, 10)); // Example minimum required calculation

        res.json({
            labels,
            currentStock,
            minimumRequired,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory overview', error: error.message });
    }
};


export async function getPatientDistribution(req: Request, res: Response, next: NextFunction) {
    try {
        const genderDistribution = await consultationModel.aggregate([
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 }
                }
            }
        ]);

        const labels = ['Female', 'Male', 'Other'];
        const data = labels.map(gender => {
            const entry = genderDistribution.find(item => item._id.toLowerCase() === gender.toLowerCase());
            return entry ? entry.count : 0;
        });

        res.json({ labels, data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient distribution', error: error.message });
    }
};


export async function getLowStockItems(req: Request, res: Response, next: NextFunction) {
    try {
        const lowStockItems = await InventoryItemModel.find({ quantity: { $lt: 100 } }).sort('quantity').limit(3);
        res.json(lowStockItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching low stock items', error: error.message });
    }
};

