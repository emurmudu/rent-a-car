import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';


// // const mongoose = require('mongoose');
// import mongoose from "mongoose";
// mongoose.set('strictPopulate', false);

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}




main();

