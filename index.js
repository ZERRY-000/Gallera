import express from 'express';
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';

// สร้าง __filename และ __dirname ใน ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import router from './routes/route.js';

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(router);



app.listen(8080, () => {
  console.log(`start server in port 8080`);
  console.log(import.meta.url);
})