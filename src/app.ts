import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { UserRoutes } from './app/modules/user/user.route';
import router from './app/routes';
import routeNotFound from './app/middleware/routeNotFound';
import globalErrorHandler from "./app/middleware/globalErrorHandler";


// const express = require('express')
const app:Application = express()
// const port = 3000


//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// app.use('/api/auth/signup', UserRoutes)
app.use('/api', router);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
app.use(globalErrorHandler);
app.use(routeNotFound)
export default app;


