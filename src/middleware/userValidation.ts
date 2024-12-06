import { UserRole } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import Joi from "joi"

const createUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(10).required(),
    role: Joi.string().required
})

const createValidation = (req: Request, res: Response, next: NextFunction):any => {
    const validation = createUserSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

const updateUserSchema = Joi.object({
    username: Joi.string().optional(),
    password: Joi.string().min(10).optional(),
    role: Joi.string().required
})

const updateValidation = (req: Request, res: Response, next: NextFunction): any => {
    const validation = updateUserSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}


const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const authValidation = (req: Request, res: Response, next: NextFunction): any => {
    const validation = authSchema.validate(req.body)
    if (validation.error) {
        return res.status(400).json({
            message: validation.error.details.map(item => item.message).join()
        })
    }
    return next()
}

export { createValidation, updateValidation, authValidation}