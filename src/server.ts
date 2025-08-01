import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv'
dotenv.config()
let server:Server;

const Main =async()=>{
try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3t5vk.mongodb.net/walletDb?retryWrites=true&w=majority&appName=Cluster0`)
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