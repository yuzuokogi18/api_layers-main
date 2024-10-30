import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { noticiaRoutes } from './presentacion/routes/noticiaRoute';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use("/api/v1/noticias", noticiaRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
