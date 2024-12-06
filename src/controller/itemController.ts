import { PrismaClient } from "@prisma/client";
import exp from "constants";
import { Request, Response } from "express";

const prisma = new PrismaClient({ errorFormat: "minimal"})

const createItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const name: string = req.body.name
        const category: string = req.body.category
        const location: string = req.body.location
        const quantity: number = Number(req.body.quantity)

        const newItem = await prisma.item.create({
            data: {
                name,category,location,quantity
            }
        })
        return(res.status(200)
        .json({
            message: `New item has been created`,
            data: newItem
        }))
    } catch (error) {
        return res.status(500).json(error)
    }
}

const readItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const search = req.query.search
        
        const allItem = await prisma.item
        .findMany({
            where: {
                OR:[
                    { name: {contains: search?.toString() || "" } },
                ]
            }
        })
        return res.status(200)
        .json({
            message: `Item has been retrieved`,
            data: allItem
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id
        // check exisiting medicine based o id
        const findItem = await prisma.item
        .findFirst(
            {where: { id: Number(id)}
    })
    
    if(!findItem) {
        return res.status(404)
        .json({
            messge: `Item is not found`
        })
    }

    const { name,category,location,quantity } = req.body

    // update medicine
    const saveItem = await prisma.item
        .update({
            where: { id: Number(id) },
            data: {
                name: name ?? findItem.name,
                category: category ?? findItem.category,
                location: location ?? findItem.location,
                quantity: quantity ? Number(quantity) : findItem.quantity,
    }})
        return res.status(200)
        .json({
            message: `Item has been update`,
            data: saveItem
        })
    } catch (error) {
        return res.status(500)
        .json(error)
    }
}

const deleteItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id

        // check existing medicine 
        const findItem = await prisma.item
            .findFirst({
                where: { id: Number(id) }
            })
        if (!findItem) { //! not
            return res.status(404)
                .json({ message: `Item is not found` })
        }
        const saveItem = await prisma.item
            .delete({
                where: { id: Number(id) }
            })
        return res.status(200)
            .json({
                message: `Item has been removed`,
                data: saveItem
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

export{ createItem, readItem, updateItem, deleteItem}