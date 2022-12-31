import * as dotenv from 'dotenv';
dotenv.config(); // app can able to  access config of env properties

import app from './server';

const port = 3001;

app.listen(port, function () {
  console.log('http://localhost:3001');
})