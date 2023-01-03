import * as dotenv from 'dotenv';
/** @internal 
 * app can able to  access config of env properties
 * This will load in our env vars into the process.
*/
dotenv.config();

import app from './server';

const port = 3001;

app.listen(port, function () {
  console.log('http://localhost:3001');
})