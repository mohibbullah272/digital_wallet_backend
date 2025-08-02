import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv'
import { SystemParameters } from './modules/admin/admin.model';
dotenv.config()
let server:Server;

const Main =async()=>{
try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3t5vk.mongodb.net/walletDb?retryWrites=true&w=majority&appName=Cluster0`)
    const paramsCount = await SystemParameters.countDocuments();
    if (paramsCount === 0) {
      const defaultParams = new SystemParameters({
        transactionFee: 5,
        userDailyLimit: 50000,
        userMonthlyLimit: 200000,
        agentDailyLimit: 200000,
        agentMonthlyLimit: 1000000,
        minBalance: 10
      });
      await defaultParams.save();}
    console.log('db connected')

   server = app.listen(5000,()=>{console.log('server running on port 5000')})
} catch (error) {
    console.log(error)
}
}

process.on('unhandledRejection',(err)=>{
    console.log('error detected server about to shuting down......',err)
if(server){
    server.close(()=>{
        process.exit(1)
    })
}
process.exit(1)
})
process.on('uncaughtException',(err)=>{
    console.log('error detected server about to shuting down......',err)
if(server){
    server.close(()=>{
        process.exit(1)
    })
}
process.exit(1)
})
process.on('SIGTERM',()=>{
    console.log(' server about to shuting down......')
if(server){
    server.close(()=>{
        process.exit(1)
    })
}
process.exit(1)
})

Main()