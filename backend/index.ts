import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 9000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server testing');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});