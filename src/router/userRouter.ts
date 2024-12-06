import { Router } from "express";
import { createValidation, updateValidation } from "../middleware/userValidation";
import { createUser, deleteUser, readUser,updateUser } from "../controller/userController";

const router = Router()
router.post(`/`, [createValidation], createUser)
router.get(`/`, readUser)
router.put(`/:id`,[updateValidation], updateUser)
router.delete(`/:id`, deleteUser)

export default router