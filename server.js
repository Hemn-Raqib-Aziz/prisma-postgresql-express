import express from 'express';
import categoryRoutes from './routes/categoryRoute.js';
import productsRoutes from './routes/productsRoute.js';

const app = express();
app.use(express.json());


app.use('/categories', categoryRoutes);
app.use('/products', productsRoutes);

app.listen(3000, () => { console.log('server running on url http://localhost:3000'); });