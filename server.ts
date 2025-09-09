import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from './routes/auth.route.js'
import morgan from "morgan";
import cookieParser from 'cookie-parser'
const app = express();




app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
// routes
app.use('/api/v1/auth',authRouter)


const port = process.env.PORT || 5101;
const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
