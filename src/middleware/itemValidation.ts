import { NextFunction, Request, Response } from "express";
import Joi from "joi"

const createItemSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    quantity: Joi.number().required().min(1)
})

const createValidation = (req: Request, res: Response, next: NextFunction):any => {
    const validation = createItemSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

const updateItemSchema = Joi.object({
    name: Joi.string().optional(),
    category: Joi.string().optional(),
    location: Joi.string().optional(),
    quantity: Joi.number().optional().min(1)
})

const updateValidation = (req: Request, res: Response, next: NextFunction): any => {
    const validation = updateItemSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

export { createValidation, updateValidation}