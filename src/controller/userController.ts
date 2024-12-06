import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient({ errorFormat: "minimal" })
type UserRole = `Admin` | `Member`

const createUser = async (req: Request, res: Response):Promise<any> => {
    try {
        const username: string = req.body.username
        const password: string = req.body.password
        const role: UserRole = req.body.role
        const findUser = await prisma.user.
        findFirst({
            where: { username }
        })
    if (findUser) {
        return res.status(400)
            .json({ message: `User sudah terdaftar` })
    }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashPassword,
                role
            }
        })
        return (res.status(200)
            .json({
                message: `New user has been created`,
                data: newUser
            }))
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const readUser = async (req: Request, res: Response):Promise<any> => {
    try {
        const search = req.query.search
        const allUser = await prisma.user
            .findMany({
                where: {
                    OR: [
                        { username: { contains: search?.toString() || "" } }
                    ]
                }
            })
        return res.status(200).json({
            message: `User has been retrieved`,
            data: allUser
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async (req: Request, res: Response):Promise<any> => {
    try {
        const id = req.params.id
        const findUser = await prisma.user
            .findFirst({
                where: { id: Number(id) }
            })
        if (!findUser) {
            return res.status(404)
                .json({
                    message: `User is not found`
                })
        }

        const { username, password } = req.body
        const saveUser = await prisma.user
            .update({
                where: { id: Number(id) },
                data: {
                username: username ? username : findUser.username,
                password: password ?
                        await bcrypt.hash(password, 10)
                        : findUser.password
                }
            })
            return res.status(200)
            .json({
                message: `User has been updated`,
                data: saveUser
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const deleteUser = async (req: Request, res: Response):Promise<any> => {
    try {
        
        const id = req.params.id
        const findUser = await prisma.user
            .findFirst({
                where: { id: Number(id) }
            })
        if (!findUser) {
            return res.status(404)
                .json({ message: `User is not found` })
        }

        const saveUser = await prisma.user
            .delete({
                where: { id: Number(id) }
            })
        return res.status(200)
            .json({
                message: `User has been removed`,
                data: saveUser
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const authentication = async (
    req: Request, res: Response
): Promise<any> => {
    try {
        const { username, password } = req.body
        const findUser = await prisma
        .user.findFirst({
            where: { username }
        })

    if (!findUser) {
        return res.status(404)
            .json({
                message: `Username is not registered`
            })
    }

    const isMatchPassword = await bcrypt
        .compare(password, findUser.password)

    if (!isMatchPassword) {
        return res.status(200)
            .json({
                message: `Invalid password`
            })
    }

    // prepare to generate token using JWT
    const payload = {
        username: findUser.username
    }


    const signature = process.env.SECRET || ``

    const token = jwt.sign(payload, signature)

    return res.status(200)
        .json({
            logged: true,
            token,
            username: findUser.username
        })

    } catch (error) {
        return res.status(500).json(error)
    }
}
export { createUser, readUser, updateUser, deleteUser, authentication}