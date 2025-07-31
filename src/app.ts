import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/api', router)

export default app;
// LH0oMmW40yZIagdg
// mongodb+srv://isiwuemmao:LH0oMmW40yZIagdg@cluster0.weugmut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0