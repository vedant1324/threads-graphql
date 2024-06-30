import express, { query }  from "express";

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function  init() {
  const app= express();

const PORT= Number(process.env.PORT) || 3000;

const gqlServer = new ApolloServer({
  typeDefs : `
  type Query {
    hello: String,
    say(say:String): String
  }
`,

// Define your resolvers
resolvers : {
  Query: {
    hello: () => 'hi buddy',
    say: (_ , {say}:{say:String}) => `${say}`
  }
}
});

await gqlServer.start();
app.get('/',(req,res)=>{
  res.json({message:"server is up and running"});
});
app.use('/graphql',express.json(),expressMiddleware(gqlServer,));

app.listen(PORT,()=>console.log("server is listening... "));

}
init ();
