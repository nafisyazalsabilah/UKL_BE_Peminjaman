import Express from "express";
import UserRouter from "./router/userRouter"
import ItemRouter from "./router/itemRouter"

const app = Express()
app.use(Express.json())

app.use(`/user`, UserRouter)
app.use(`/item`, ItemRouter )

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server Peminjaman run on port ${PORT}`)
})