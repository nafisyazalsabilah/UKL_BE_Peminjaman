import { Router } from "express";
import { createValidation, updateValidation } from "../middleware/itemValidation";
import { createItem, deleteItem, readItem, updateItem } from "../controller/itemController";

const router = Router()
router.post(`/`, [createValidation], createItem)
router.get(`/`, readItem)
router.put(`/:id`,[updateValidation], updateItem)
router.delete(`/:id`, deleteItem)

export default router