import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors'


const app:Application = express()

app.use(cors())
app.use(express.json())



app.get('/',async(req:Request,res:Response)=>{
    res.send(`welcome digital wallet server`)
})






export default app