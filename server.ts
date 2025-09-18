import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.routes.js'
import teacherRouter from './routes/teacher.routes.js'
import adminRouter from './routes/admin.route.js'
import institutionRoutes from './routes/institution.route.js';
import studentRoutes from './routes/student.routes.js'
import challengeRoutes from './routes/challenge.routes.js'
const app = express();



// main packages
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
// routes
app.use('/api/v1/admin/institutions',adminRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)
app.use('/api/v1/teacher',teacherRouter)
app.use('/api/v1/institution', institutionRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/challenges', challengeRoutes);
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
