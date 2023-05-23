import mongoose from "mongoose";



const Schema = new mongoose.Schema({               
    title :
    {
      type: String,
      required: true,

    },
    description: {
       type: String,
       required:true,
   },
    iscompleted: {
      type: Boolean,
      default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    createdAT:{
        type: Date,
        default: Date.now,
    }

});
export const Task = mongoose.model("Task", Schema);  