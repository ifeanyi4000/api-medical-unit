import { NextFunction, Request, Response } from 'express';
import InventoryItemModel from '../models/inventory.model';
import ErrorHandler from '../utils/ErrorHandler';


// Get all inventory items

export const getAllInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await InventoryItemModel.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new inventory item
export const createInventory = async (req: Request, res: Response, next: NextFunction) => {
    const item = new InventoryItemModel({
        name: req.body.name,
        quantity: req.body.quantity,
        strength: req.body.strength,
        dosageForm: req.body.dosageForm,
        expiry_date: req.body.expiry_date,
        prescription: req.body.prescription
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an inventory item
export const updateInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await InventoryItemModel.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (req.body.name != null) {
            item.name = req.body.name;
        }
        if (req.body.quantity != null) {
            item.quantity = req.body.quantity;
        }
        if (req.body.usageCount != null) {
            item.usageCount = req.body.usageCount;
        }
        if (req.body.strength) {
            item.strength = req.body.strength;
        }
        if (req.body.dosageForm) {
            item.dosageForm = req.body.dosageForm;
        }
        if (req.body.expiry_date) {
            item.expiry_date = req.body.expiry_date;
        }
        if (req.body.prescription) {
            item.prescription = req.body.prescription;
        }
        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an inventory item
// router.delete('/:id', async (req, res) => {
export const deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const consultation = await InventoryItemModel.findById(id)

        if (!consultation) {
            return next(new ErrorHandler("Item not found", 404))
        }
        await consultation.deleteOne({ id });
        res.status(200).json({
            success: true,
            message: "Item deleted successful",
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
};

// Use an item (decrease quantity and increase usage count)
// router.post('/:id/use', async (req, res) => {
export const decreaseQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await InventoryItemModel.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const amount = req.body.amount || 1;
        if (item.quantity < amount) {
            return res.status(400).json({ message: 'Not enough quantity' });
        }

        item.quantity -= amount;
        item.usageCount += amount;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add to inventory (increase quantity)
// router.post('/:id/add', async (req, res) => {
export const increaseQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = await InventoryItemModel.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const amount = req.body.amount || 1;
        item.quantity += amount;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
