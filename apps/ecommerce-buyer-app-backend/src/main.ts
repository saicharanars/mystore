/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { User, schema } from '@ecommerce/types';
const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  const data: User = {
    name: 'John Dguyg tgf',
    age: 0,
    email: 'sai@g.com',
  };
  let result;
  try {
    result = schema.safeParse(data);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  res.send({ message: 'Welcome to ecommerce-buyer-app-backend!', ans: result });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
