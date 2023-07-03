import express, {  Request, Response} from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todos";
const app=express();
const PORT=3000;

//middleware
app.use(express.json());
//db connection
mongoose.connect('mongodb://127.0.0.1:27017/tsCRUD',).then(()=>{
    console.log("DB Connected");
}
).catch((err)=>{
    console.log(err);
}
);

app.use('/api/todos',todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
}   
);

