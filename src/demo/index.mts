import { bindExpress } from '../express/index.mjs';
import { Context } from '../index.mjs';
import './DemoController.mjs';

import express from 'express';

const app = express();
const port = 9555;

bindExpress({ app, prefix: 'api' });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
Context.print();

