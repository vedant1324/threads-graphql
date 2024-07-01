import express, { query }  from "express";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from "./lib/db";

async function  init() {
  const app= express();

const PORT= Number(process.env.PORT) || 3000;

const gqlServer = new ApolloServer({
  typeDefs : `

  type Query {
    hello: String,
    say(say:String): String
  }

  type Mutation{
  createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
  }

`,

// Define your resolvers
resolvers : {
  Query: {
    hello: () => 'hi buddy',
    say: (_ , {say}:{say:String}) => `${say}`
  },
   Mutation: {
    createUser:async (_,{firstName,lastName,password,email}:{firstName:string,lastName:string,email:string,password:string})=>{
      await prismaClient.user.create({
        data : {
          email,
          firstName,
          lastName,
          password,
          salt :"random Salt",
          ProfileImageURL : 'http://example.com/profile.jpg',
        },
       
      });
      return true;
    },
   },
},
});

await gqlServer.start();
app.get('/',(req,res)=>{
  res.json({message:"server is up and running"});
});
app.use('/graphql',express.json(),expressMiddleware(gqlServer,));

app.listen(PORT,()=>console.log("server is listening... "));

}
init ();
