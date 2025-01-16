import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { createInventory, decreaseQuantity, deleteInventory, getAllInventory, increaseQuantity, updateInventory } from '../controlers/inventory.controller';

const inventoryRouter = express.Router();

inventoryRouter.post('/create-inventroy', createInventory, );
inventoryRouter.get('/get-all-inventory', getAllInventory, );
inventoryRouter.post('/update-invetory/:id', updateInventory, );
inventoryRouter.post('/decrease-inventory/:id', decreaseQuantity, );
inventoryRouter.post('/increase-inventory/:id', increaseQuantity, );
inventoryRouter.delete('/delete-inventory/:id',  deleteInventory, );

export default inventoryRouter;