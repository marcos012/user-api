import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import routes from './routes';

const app = express();

dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes)

app.listen(process.env.PORT || 3333);
