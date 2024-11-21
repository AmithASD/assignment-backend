const express = require('express');
const http = require('http');
const cors = require('cors');
import authRouters from './routers/AuthRoutes.js';

const app =express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// const uri = "mongo db uri";

// const connect = async() => {
//     try {
//       await mongoose.connect(uri);
//       console.log("connected");
//     } catch (error) {
//       console.log("connection faild", error);
//     }
// }
// connect();

const port = 3001;
server.listen( port, ()=>{
  console.log(`Listning on port :${port}`);
})

app.use('/api/auth', authRouters);
