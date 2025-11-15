import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import serverless from "serverless-http";


import productRoutes from './routes/product.route.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// Always connect to DB per request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(express.json());

app.use('/api/products', productRoutes);


// Only run app.listen in non-production environments
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export serverless function
export const handler = serverless(app);
export default app;