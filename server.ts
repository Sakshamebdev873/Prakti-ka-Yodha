import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.routes.js'
const app = express();



// main packages
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
// routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)

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
