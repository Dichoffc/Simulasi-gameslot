import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => console.log('✅ Server jalan di port', process.env.PORT));
});
