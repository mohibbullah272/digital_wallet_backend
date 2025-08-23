import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors'
import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import WalletRouter from "./modules/wallet/wallet.route";
import transactionsRouter from "./modules/transaction/transaction.route";
import agentRouter from "./modules/agent/agent.route";
import adminRouter from "./modules/admin/admin.route";
import { validateRequest} from './middlewares/error';
const cookieParser = require('cookie-parser')

const app:Application = express()

app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials:true
    }
))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/wallets', WalletRouter);
app.use('/api/transactions',transactionsRouter );
app.use('/api/agents', agentRouter);
app.use('/api/admin', adminRouter);



app.get('/',async(req:Request,res:Response)=>{
    res.send(`welcome digital wallet server`)
})

app.use(validateRequest);






export default app