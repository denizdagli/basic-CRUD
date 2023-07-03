import mongoose, { Schema,Document } from "mongoose";

export interface ITodo extends Document{
    title: string;
    description: string;
    status: boolean;
}

const TodoSchema:Schema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:Boolean,required:true, default:false}
})

export default mongoose.model<ITodo>("Todo",TodoSchema);