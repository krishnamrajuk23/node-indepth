import morgan from 'morgan';
import express from 'express';
import cors from 'cors';

import { createNewUser, singIn } from './handlers/user';
import router from './router';
import { protect } from './modules/auth';

const app = express();

/* Middleware */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('hello');
  res.status(200);
  res.json({ message: "hello world" })
});


/**
 * @param '/api' - here we mounting the path to router
 */
app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/singIn', singIn)

export default app;

