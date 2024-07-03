import {ApolloServer} from "@apollo/server";
import { User } from "@prisma/client";
import { user } from "../user";


async function createGraphQlServer(){
    
const gqlServer = new ApolloServer({
    typeDefs : `
  
    type Query {
       ${user.queries}
    }
  
    type Mutation{
      ${user.mutations}
    }
  
  `,
  
  // Define your resolvers
  resolvers : {
    Query: {
      ...user.resolvers.queries,
    },
     Mutation: {
        ...user.resolvers.mutations,
    },
    } 
    
});

   await gqlServer.start();
   return gqlServer;

}
export default createGraphQlServer;
