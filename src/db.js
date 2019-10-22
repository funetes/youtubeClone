import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify: false 
});

const db = mongoose.connection;

const handleOpen = () => console.log("db connected");
const handleError = e => console.log(`error:${e}`);

db.once("open",handleOpen);
db.on("error : ",handleError);