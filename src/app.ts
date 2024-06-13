
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
// const express = require('express')
const app:Application = express()
// const port = 3000


//parsers
app.use(express.json());
app.use(cors());

app.use('/api/auth/signup', UserRoutes)

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


export default app;


