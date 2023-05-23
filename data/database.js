import mongoose from "mongoose";


export const connectDB =()=>{
    mongoose.connect(process.env.MONGO_URI,
{         
    dbname: "Project_three"
})                                       
.then((c)=>console.log(`database is connected with ${c.connection.host}`)).catch((e)=>console.log(e));    
};