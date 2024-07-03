import express, { query }  from "express";

import { expressMiddleware } from '@apollo/server/express4';

import createGraphQlServer from "./graphql";

async function  init() {
  const app= express();

const PORT= Number(process.env.PORT) || 3000;

app.get('/',(req,res)=>{
  res.json({message:"server is up and running"});
});

app.use('/graphql',express.json(),expressMiddleware(await createGraphQlServer()));

app.listen(PORT,()=>console.log("server is listening... "));

}
init ();
