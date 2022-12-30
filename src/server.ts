import express from 'express';
import router from './router';
import morgan from 'morgan';

const app = express();

/* Middleware */
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
app.use('/api', router);

export default app;

